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
  Trash2, 
  Calendar, 
  Clock, 
  RotateCcw,
  Play,
  Pause,
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

interface ScheduledArticlesManagementProps {
  onLogout: () => void;
}

export default function ScheduledArticlesManagement({ onLogout }: ScheduledArticlesManagementProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "immigration",
    customPrompt: "",
    scheduledFor: "",
    priority: "medium",
    notes: ""
  });

  // Queries
  const scheduledArticles = useQuery(api.scheduledArticles.list, {
    status: selectedStatus === "all" ? undefined : selectedStatus,
    category: selectedCategory === "all" ? undefined : selectedCategory,
  });

  const stats = useQuery(api.scheduledArticles.getStats);
  const upcoming = useQuery(api.scheduledArticles.getUpcoming, { days: 7 });

  // Mutations
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

  const statuses = [
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
    return date.toISOString().slice(0, 16); // Format for datetime-local input
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-blue-500";
      case "processing":
        return "bg-yellow-500";
      case "completed":
        return "bg-green-500";
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
    setShowCreateForm(false);
    setEditingArticle(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.scheduledFor) {
      alert("Please fill in required fields (title and scheduled time)");
      return;
    }

    try {
      const scheduledTime = new Date(formData.scheduledFor).getTime();
      
      if (editingArticle) {
        await updateScheduled({
          id: editingArticle._id,
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

  const handleEdit = (article: any) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      category: article.category,
      customPrompt: article.customPrompt || "",
      scheduledFor: formatDateForInput(article.scheduledFor),
      priority: article.priority,
      notes: article.notes || ""
    });
    setShowCreateForm(true);
  };

  const handleDelete = async (id: Id<"scheduledArticles">) => {
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
            <h1 className="text-3xl font-bold text-foreground">Scheduled Articles</h1>
            <p className="text-muted-foreground">Schedule AI-generated news articles with custom titles</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setShowCreateForm(true)}
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

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">Pending</span>
                </div>
                <div className="text-2xl font-bold">{stats.pending}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium">Processing</span>
                </div>
                <div className="text-2xl font-bold">{stats.processing}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Completed</span>
                </div>
                <div className="text-2xl font-bold">{stats.completed}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium">Overdue</span>
                </div>
                <div className="text-2xl font-bold">{stats.overdue}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium">This Week</span>
                </div>
                <div className="text-2xl font-bold">{stats.upcomingWeek}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Create/Edit Form */}
        {showCreateForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingArticle ? "Edit" : "Schedule New"} Article</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                    {editingArticle ? "Update" : "Schedule"} Article
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
            {statuses.map((status) => (
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

        {/* Scheduled Articles Table */}
        <Card>
          <CardHeader>
            <CardTitle>Scheduled Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Title</th>
                    <th className="text-left p-2">Category</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Priority</th>
                    <th className="text-left p-2">Scheduled For</th>
                    <th className="text-left p-2">Created</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduledArticles?.map((article) => (
                    <tr key={article._id} className="border-b hover:bg-muted/50">
                      <td className="p-2">
                        <div className="max-w-xs">
                          <div className="font-medium truncate">{article.title}</div>
                          {article.notes && (
                            <div className="text-sm text-muted-foreground truncate">
                              {article.notes}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-2">
                        <Badge variant="outline" className="capitalize">
                          {article.category}
                        </Badge>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(article.status)}`}></div>
                          <span className="capitalize">{article.status}</span>
                          {article.status === "failed" && (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                      </td>
                      <td className="p-2">
                        <Badge className={getPriorityColor(article.priority)}>
                          {article.priority}
                        </Badge>
                      </td>
                      <td className="p-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(article.scheduledFor)}
                        </div>
                        {article.scheduledFor < Date.now() && article.status === "pending" && (
                          <div className="text-red-500 text-xs">Overdue</div>
                        )}
                      </td>
                      <td className="p-2 text-sm text-muted-foreground">
                        {formatDate(article.createdAt)}
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          {article.generatedArticleId && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => window.open(`/news/${article.generatedArticleId}`, '_blank')}
                              className="text-green-600 hover:text-green-700"
                            >
                              <CheckCircle className="w-3 h-3" />
                            </Button>
                          )}
                          
                          {article.status === "pending" && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEdit(article)}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                          )}
                          
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(article._id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {(!scheduledArticles || scheduledArticles.length === 0) && (
                <div className="text-center py-8 text-muted-foreground">
                  No scheduled articles found. Schedule some articles to get started!
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Articles Preview */}
        {upcoming && upcoming.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Upcoming This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {upcoming.slice(0, 5).map((article) => (
                  <div key={article._id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <div className="font-medium">{article.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {article.category} • {formatDate(article.scheduledFor)}
                      </div>
                    </div>
                    <Badge className={getPriorityColor(article.priority)}>
                      {article.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}