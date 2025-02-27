"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  rentalApplicationSchema,
  RentalApplicationForm,
  defaultValues,
} from "./tenantApplicationSchema";

export default function TenantApplicationForm() {
  const form = useForm<RentalApplicationForm>({
    resolver: zodResolver(rentalApplicationSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = (values: RentalApplicationForm) => {};

  return <section></section>;
}
