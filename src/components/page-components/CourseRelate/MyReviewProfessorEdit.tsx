import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Review } from "@/types";
import StarRating from "../StarRating"; // ✅ import star rating
import api from "@/api";
import React, { useState } from "react";

interface MyReviewProfessorEditProps {
  review: Review;
  onClose: () => void;
}

export default function MyReviewProfessorEdit({
  review,
  onClose,
}: MyReviewProfessorEditProps) {
  const [formData, setFormData] = useState({
    rating: review.rating,
    comment: review.comment || "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.put("users/reviews", {
        reviewId: review.id,
        rating: Number(formData.rating),
        comment: formData.comment,
      });

      if (res.data.success) {
        alert(res.data.message || "Review updated successfully.");
        onClose(); // close dialog
        window.location.reload(); // optional (we can later update store)
      } else {
        alert("Failed to update review. Please try again.");
      }
    } catch (error) {
      console.error("Error updating review:", error);
      alert("Something went wrong while updating the review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-2">
      {/* ✅ Star Rating Field */}
      <Field>
        <FieldLabel>Rating</FieldLabel>
        <div className="flex items-center gap-2">
          <StarRating
            value={formData.rating}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, rating: val }))
            }
          />
          <span className="text-sm text-gray-500">{formData.rating} / 5</span>
        </div>
      </Field>

      {/* ✅ Comment Field */}
      <Field>
        <FieldLabel htmlFor="comment">Your Comment</FieldLabel>
        <Textarea
          id="comment"
          name="comment"
          placeholder="Write your updated review..."
          required
          className="w-full"
          value={formData.comment}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, comment: e.target.value }))
          }
        />
      </Field>

      {/* ✅ Actions */}
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
