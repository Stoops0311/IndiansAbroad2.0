"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, LogOut, Edit, Trash2, Eye, EyeOff, Star, User } from "lucide-react";
import TestimonialForm from "./TestimonialForm";

interface TestimonialManagementProps {
  onLogout: () => void;
}

export default function TestimonialManagement({ onLogout }: TestimonialManagementProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);

  const testimonials = useQuery(api.testimonials.getAllTestimonialsAdmin);
  const deleteTestimonial = useMutation(api.testimonials.deleteTestimonial);
  const updateTestimonial = useMutation(api.testimonials.updateTestimonial);

  const handleEdit = (testimonial: any) => {
    setEditingTestimonial(testimonial);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial? This action cannot be undone.")) {
      try {
        // Just delete testimonial from database (files remain in B2)
        await deleteTestimonial({ id: id as any });
      } catch (error) {
        console.error("Error deleting testimonial:", error);
        alert("Failed to delete testimonial. Please try again.");
      }
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await updateTestimonial({ id: id as any, isActive: !currentStatus });
    } catch (error) {
      console.error("Error updating testimonial status:", error);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingTestimonial(null);
  };

  const activeCount = testimonials?.filter(t => t.isActive).length || 0;
  const totalCount = testimonials?.length || 0;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Testimonial Management</h1>
          <p className="text-white/70">
            {activeCount} active testimonials out of {totalCount} total
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setShowForm(true)}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Testimonial
          </Button>
          <Button
            onClick={onLogout}
            variant="outline"
            className="border-red-400/20 text-red-400 hover:bg-red-400/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials?.map((testimonial) => (
          <Card 
            key={testimonial._id}
            className={`p-6 ${testimonial.isActive ? 'bg-white/10' : 'bg-white/5 opacity-60'} backdrop-blur-lg border-primary/20 hover:border-primary/40 transition-all`}
          >
            <div className="space-y-4">
              {/* Header with status */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {testimonial.photoUrl ? (
                    <img
                      src={testimonial.photoUrl}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-white text-lg">{testimonial.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <span>{testimonial.flag} {testimonial.country}</span>
                    </div>
                  </div>
                </div>
                <Badge className={testimonial.isActive ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}>
                  {testimonial.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>

              {/* Rating */}
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Review */}
              <blockquote className="text-sm text-white/90 italic line-clamp-3">
                "{testimonial.review}"
              </blockquote>

              {/* Achievement & Service */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-primary font-medium">{testimonial.achievement}</span>
                  <span className="text-white/60">{testimonial.timeframe}</span>
                </div>
                <Badge className="bg-primary/20 text-primary text-xs">
                  {testimonial.service}
                </Badge>
              </div>

              {/* Supporting docs indicator */}
              {testimonial.supportingDocUrls && testimonial.supportingDocUrls.length > 0 && (
                <div className="text-xs text-white/60">
                  📎 {testimonial.supportingDocUrls.length} supporting document(s)
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t border-white/10">
                <Button
                  onClick={() => handleEdit(testimonial)}
                  size="sm"
                  variant="outline"
                  className="flex-1 border-primary/20 text-primary hover:bg-primary/10"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleToggleActive(testimonial._id, testimonial.isActive)}
                  size="sm"
                  variant="outline"
                  className="flex-1 border-blue-400/20 text-blue-400 hover:bg-blue-400/10"
                >
                  {testimonial.isActive ? (
                    <>
                      <EyeOff className="h-3 w-3 mr-1" />
                      Hide
                    </>
                  ) : (
                    <>
                      <Eye className="h-3 w-3 mr-1" />
                      Show
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => handleDelete(testimonial._id)}
                  size="sm"
                  variant="outline"
                  className="border-red-400/20 text-red-400 hover:bg-red-400/10"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {testimonials && testimonials.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
            <Plus className="h-8 w-8 text-white/50" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No testimonials yet</h3>
          <p className="text-white/70 mb-4">Get started by adding your first testimonial</p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add First Testimonial
          </Button>
        </div>
      )}

      {/* Testimonial Form Modal */}
      {showForm && (
        <TestimonialForm
          testimonial={editingTestimonial}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}