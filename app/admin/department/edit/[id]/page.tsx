"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function EditDepartmentPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fetch department data
    const fetchDepartment = async () => {
      try {
        const res = await fetch(`/api/department/${id}`);
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.message || "Failed to fetch department");
          return;
        }
        setName(data.department.name);
        setDescription(data.department.description || "");
      } catch (err) {
        toast.error("Server error");
      }
    };

    fetchDepartment();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Department name is required");

    setLoading(true);

    try {
      const res = await fetch(`/api/department/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });

      const data = await res.json();

      if (!res.ok) return toast.error(data.message || "Update failed");

      toast.success("Department updated successfully!");
      router.push("/admin/department");
    } catch (err) {
      toast.error("Server error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => router.push("/admin/department");

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Edit Department</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name" className="mb-1">Department Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="description" className="mb-1">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4 mt-4">
          <Button variant="outline" onClick={handleCancel} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Department"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}