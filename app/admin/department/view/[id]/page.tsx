"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ViewDepartmentPage() {
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const [department, setDepartment] = useState<{ name: string; description?: string } | null>(null);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const res = await fetch(`/api/department/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch");
        setDepartment(data.department);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDepartment();
  }, [id]);

  if (!department) return <p className="text-center mt-10">Loading...</p>;

  return (
    <Card className="py-4 max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Department Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <strong>Name:</strong> {department.name}
        </div>
        <div>
          <strong>Description:</strong> {department.description || "-"}
        </div>
      </CardContent>
      <div className="flex justify-end mt-4 gap-4 mx-4">
        <Button variant="outline" onClick={() => router.push("/admin/department")}>
          Back
        </Button>
        <Button onClick={() => router.push(`/admin/department/edit/${id}`)}>
          Edit
        </Button>
      </div>
    </Card>
  );
}