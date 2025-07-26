"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  Calendar, 
  Clock, 
  RotateCcw,
  CheckCircle,
  Archive,
  Play,
  AlertCircle,
  XCircle,
  Newspaper
} from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

interface NewsManagementProps {
  onLogout: () => void;
}

export default function NewsManagement({ onLogout }: NewsManagementProps) {
  const [activeTab, setActiveTab] = useState<"published" | "scheduled">("published");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [editingScheduled, setEditingScheduled] = useState<any>(null);

  // Form state for scheduling
  const [formData, setFormData] = useState({
    title: "",
    category: "immigration",
    customPrompt: "",
    scheduledFor: "",
    priority: "medium",
    notes: ""
  });

  // Queries
  const articles = useQuery(api.news.list, {
    status: selectedStatus === "all" ? undefined : selectedStatus,
    category: selectedCategory === "all" ? undefined : selectedCategory,
  });

  const scheduledArticles = useQuery(api.scheduledArticles.list, {
    status: selectedStatus === "all" ? undefined : selectedStatus,
    category: selectedCategory === "all" ? undefined : selectedCategory,
  });

  const scheduledStats = useQuery(api.scheduledArticles.getStats);

  // Mutations
  const publishArticle = useMutation(api.news.publish);
  const archiveArticle = useMutation(api.news.archive);
  const softDeleteArticle = useMutation(api.news.softDelete);
  const createScheduled = useMutation(api.scheduledArticles.create);
  const updateScheduled = useMutation(api.scheduledArticles.update);
  const deleteScheduled = useMutation(api.scheduledArticles.remove);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "immigration", label: "Immigration" },
    { value: "education", label: "Education" },
    { value: "visa", label: "Visa Updates" },
    { value: "career", label: "Career" },
    { value: "success", label: "Success Stories" },
    { value: "culture", label: "Culture & Community" },
  ];

  const publishedStatuses = [
    { value: "all", label: "All Status" },
    { value: "draft", label: "Draft" },
    { value: "published", label: "Published" },
    { value: "archived", label: "Archived" },
  ];

  const scheduledStatuses = [
    { value: "all", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "completed", label: "Completed" },
    { value: "failed", label: "Failed" },
  ];

  const priorities = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const formatDateForInput = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toISOString().slice(0, 16);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
      case "completed":
        return "bg-green-500";
      case "draft":
      case "pending":
        return "bg-yellow-500";
      case "processing":
        return "bg-blue-500";
      case "archived":
        return "bg-gray-500";
      case "failed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "immigration",
      customPrompt: "",
      scheduledFor: "",
      priority: "medium",
      notes: ""
    });
    setShowScheduleForm(false);
    setEditingScheduled(null);
  };

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.scheduledFor) {
      alert("Please fill in required fields (title and scheduled time)");
      return;
    }

    try {
      const scheduledTime = new Date(formData.scheduledFor).getTime();
      
      if (editingScheduled) {
        await updateScheduled({
          id: editingScheduled._id,
          title: formData.title,
          category: formData.category,
          customPrompt: formData.customPrompt || undefined,
          scheduledFor: scheduledTime,
          priority: formData.priority,
          notes: formData.notes || undefined,
        });
      } else {
        await createScheduled({
          title: formData.title,
          category: formData.category,
          customPrompt: formData.customPrompt || undefined,
          scheduledFor: scheduledTime,
          priority: formData.priority,
          createdBy: "Admin",
          notes: formData.notes || undefined,
        });
      }
      
      resetForm();
    } catch (error) {
      console.error("Error saving scheduled article:", error);
      alert("Error saving scheduled article");
    }
  };

  const handleEditScheduled = (article: any) => {
    setEditingScheduled(article);
    setFormData({
      title: article.title,
      category: article.category,
      customPrompt: article.customPrompt || "",
      scheduledFor: formatDateForInput(article.scheduledFor),
      priority: article.priority,
      notes: article.notes || ""
    });
    setShowScheduleForm(true);
  };

  const handlePublish = async (id: Id<"newsArticles">) => {
    try {
      await publishArticle({ id });
    } catch (error) {
      console.error("Error publishing article:", error);
    }
  };

  const handleArchive = async (id: Id<"newsArticles">) => {
    try {
      await archiveArticle({ id });
    } catch (error) {
      console.error("Error archiving article:", error);
    }
  };

  const handleDeleteArticle = async (id: Id<"newsArticles">) => {
    if (confirm("Are you sure you want to delete this article?")) {
      try {
        await softDeleteArticle({ id });
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    }
  };

  const handleDeleteScheduled = async (id: Id<"scheduledArticles">) => {
    if (confirm("Are you sure you want to delete this scheduled article?")) {
      try {
        await deleteScheduled({ id });
      } catch (error) {
        console.error("Error deleting scheduled article:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">News & Articles Management</h1>
            <p className="text-muted-foreground">Manage published articles and schedule new ones</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setShowScheduleForm(true)}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Schedule Article
            </Button>
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === "published" ? "default" : "outline"}
            onClick={() => setActiveTab("published")}
            className="flex items-center gap-2"
          >
            <Newspaper className="w-4 h-4" />
            Published Articles
          </Button>
          <Button
            variant={activeTab === "scheduled" ? "default" : "outline"}
            onClick={() => setActiveTab("scheduled")}
            className="flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Scheduled Articles
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {activeTab === "published" ? (
            <>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Published</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {articles?.filter(a => a.status === "published").length || 0}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium">Drafts</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {articles?.filter(a => a.status === "draft").length || 0}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span className="text-sm font-medium">Archived</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {articles?.filter(a => a.status === "archived").length || 0}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium">Total</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {articles?.length || 0}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            scheduledStats && (
              <>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm font-medium">Pending</span>
                    </div>
                    <div className="text-2xl font-bold">{scheduledStats.pending}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">Completed</span>
                    </div>
                    <div className="text-2xl font-bold">{scheduledStats.completed}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm font-medium">Overdue</span>
                    </div>
                    <div className="text-2xl font-bold">{scheduledStats.overdue}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm font-medium">This Week</span>
                    </div>
                    <div className="text-2xl font-bold">{scheduledStats.upcomingWeek}</div>
                  </CardContent>
                </Card>
              </>
            )
          )}
        </div>

        {/* Schedule Article Form */}
        {showScheduleForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingScheduled ? "Edit" : "Schedule New"} Article</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleScheduleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title *</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter article title..."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg bg-background"
                    >
                      {categories.slice(1).map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Scheduled For *</label>
                    <Input
                      type="datetime-local"
                      value={formData.scheduledFor}
                      onChange={(e) => setFormData({ ...formData, scheduledFor: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg bg-background"
                    >
                      {priorities.map((priority) => (
                        <option key={priority.value} value={priority.value}>
                          {priority.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Custom Prompt (Optional)</label>
                  <Textarea
                    value={formData.customPrompt}
                    onChange={(e) => setFormData({ ...formData, customPrompt: e.target.value })}
                    placeholder="Custom research prompt for the AI (leave empty to use default for category)..."
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Notes (Optional)</label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Internal notes about this scheduled article..."
                    rows={2}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit">
                    {editingScheduled ? "Update" : "Schedule"} Article
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-background"
          >
            {(activeTab === "published" ? publishedStatuses : scheduledStatuses).map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-background"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>

          <Button
            variant="outline"
            onClick={() => {
              setSelectedStatus("all");
              setSelectedCategory("all");
            }}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
        </div>

        {/* Content Table */}
        <Card>
          <CardHeader>
            <CardTitle>{activeTab === "published" ? "Published Articles" : "Scheduled Articles"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Title</th>
                    <th className="text-left p-2">Category</th>
                    <th className="text-left p-2">Status</th>
                    {activeTab === "scheduled" && <th className="text-left p-2">Priority</th>}
                    <th className="text-left p-2">{activeTab === "published" ? "Generated" : "Scheduled For"}</th>
                    {activeTab === "published" && <th className="text-left p-2">Published</th>}
                    {activeTab === "published" && <th className="text-left p-2">Reading Time</th>}
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(activeTab === "published" ? articles : scheduledArticles)?.map((item) => (
                    <tr key={item._id} className="border-b hover:bg-muted/50">
                      <td className="p-2">
                        <div className="max-w-xs">
                          <div className="font-medium truncate">{item.title}</div>
                          <div className="text-sm text-muted-foreground truncate">
                            {activeTab === "published" ? (item as any).summary : (item as any).notes}
                          </div>
                        </div>
                      </td>
                      <td className="p-2">
                        <Badge variant="outline" className="capitalize">
                          {item.category}
                        </Badge>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(item.status)}`}></div>
                          <span className="capitalize">{item.status}</span>
                          {activeTab === "scheduled" && item.status === "failed" && (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                      </td>
                      {activeTab === "scheduled" && (
                        <td className="p-2">
                          <Badge className={getPriorityColor((item as any).priority)}>
                            {(item as any).priority}
                          </Badge>
                        </td>
                      )}
                      <td className="p-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(activeTab === "published" ? (item as any).generatedAt : (item as any).scheduledFor)}
                        </div>
                        {activeTab === "scheduled" && (item as any).scheduledFor < Date.now() && item.status === "pending" && (
                          <div className="text-red-500 text-xs">Overdue</div>
                        )}
                      </td>
                      {activeTab === "published" && (
                        <>
                          <td className="p-2 text-sm text-muted-foreground">
                            {(item as any).publishedAt ? formatDate((item as any).publishedAt) : "-"}
                          </td>
                          <td className="p-2">
                            <div className="flex items-center gap-1 text-sm">
                              <Clock className="w-3 h-3" />
                              {(item as any).readingTime}m
                            </div>
                          </td>
                        </>
                      )}
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          {activeTab === "published" ? (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  const url = item.status === "draft" 
                                    ? `/news/${item._id}?preview=admin`
                                    : `/news/${item._id}`;
                                  window.open(url, '_blank');
                                }}
                              >
                                <Eye className="w-3 h-3" />
                              </Button>
                              
                              {item.status === "draft" && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handlePublish(item._id as any)}
                                  className="text-green-600 hover:text-green-700"
                                >
                                  <Play className="w-3 h-3" />
                                </Button>
                              )}
                              
                              {item.status === "published" && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleArchive(item._id as any)}
                                  className="text-orange-600 hover:text-orange-700"
                                >
                                  <Archive className="w-3 h-3" />
                                </Button>
                              )}
                              
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDeleteArticle(item._id as any)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </>
                          ) : (
                            <>
                              {(item as any).generatedArticleId && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => window.open(`/news/${(item as any).generatedArticleId}`, '_blank')}
                                  className="text-green-600 hover:text-green-700"
                                >
                                  <CheckCircle className="w-3 h-3" />
                                </Button>
                              )}
                              
                              {item.status === "pending" && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleEditScheduled(item)}
                                >
                                  <Edit className="w-3 h-3" />
                                </Button>
                              )}
                              
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDeleteScheduled(item._id as any)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {((!articles || articles.length === 0) && activeTab === "published") && (
                <div className="text-center py-8 text-muted-foreground">
                  No articles found. Schedule some articles to get started!
                </div>
              )}

              {((!scheduledArticles || scheduledArticles.length === 0) && activeTab === "scheduled") && (
                <div className="text-center py-8 text-muted-foreground">
                  No scheduled articles found. Click "Schedule Article" to create one!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}