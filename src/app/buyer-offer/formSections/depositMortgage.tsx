import { useFormContext } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { BuyerOfferFormValues } from "../buyerOfferSchema";

// Will contain:
// - Deposit Amount
// - Deposit Details
// - Mortgage Broker
// - Solicitor

type Props = {};

export default function DepositMortgage(props: Props) {
  const form = useFormContext<BuyerOfferFormValues>();
  const requireMortgage = form.watch("requireMortgage");

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="depositAmount"
        render={({ field }) => (
          <div className="space-y-2">
            <label className="text-sm font-medium">Deposit Amount</label>
            <Input
              type="number"
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
              placeholder="Enter deposit amount"
            />
          </div>
        )}
      />

      <FormField
        control={form.control}
        name="depositDetails"
        render={({ field }) => (
          <div className="space-y-2">
            <label className="text-sm font-medium">Deposit Details</label>
            <Textarea
              {...field}
              placeholder="Please explain how you received this money"
            />
          </div>
        )}
      />

      <FormField
        control={form.control}
        name="requireMortgage"
        render={({ field }) => (
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Require Mortgage</label>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </div>
        )}
      />

      {requireMortgage && (
        <>
          <FormField
            control={form.control}
            name="brokerContact"
            render={({ field }) => (
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  Are you happy to be contacted by our in house mortgage broker?
                </label>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </div>
            )}
          />

          <div className="space-y-4">
            <h3 className="font-medium">Mortgage Broker Details</h3>
            <FormField
              control={form.control}
              name="mortgageBroker.name"
              render={({ field }) => (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Broker Name</label>
                  <Input {...field} placeholder="Enter broker name" />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="mortgageBroker.address"
              render={({ field }) => (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Broker Address</label>
                  <Input {...field} placeholder="Enter broker address" />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="mortgageBroker.phone"
              render={({ field }) => (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Broker Phone</label>
                  <Input {...field} placeholder="Enter broker phone" />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="mortgageBroker.email"
              render={({ field }) => (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Broker Email</label>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter broker email"
                  />
                </div>
              )}
            />
          </div>
        </>
      )}

      <div className="space-y-4">
        <h3 className="font-medium">Solicitor Details</h3>
        <FormField
          control={form.control}
          name="solicitor.name"
          render={({ field }) => (
            <div className="space-y-2">
              <label className="text-sm font-medium">Solicitor Name</label>
              <Input {...field} placeholder="Enter solicitor name" />
            </div>
          )}
        />
        <FormField
          control={form.control}
          name="solicitor.address"
          render={({ field }) => (
            <div className="space-y-2">
              <label className="text-sm font-medium">Solicitor Address</label>
              <Input {...field} placeholder="Enter solicitor address" />
            </div>
          )}
        />
        <FormField
          control={form.control}
          name="solicitor.phone"
          render={({ field }) => (
            <div className="space-y-2">
              <label className="text-sm font-medium">Solicitor Phone</label>
              <Input {...field} placeholder="Enter solicitor phone" />
            </div>
          )}
        />
        <FormField
          control={form.control}
          name="solicitor.email"
          render={({ field }) => (
            <div className="space-y-2">
              <label className="text-sm font-medium">Solicitor Email</label>
              <Input
                {...field}
                type="email"
                placeholder="Enter solicitor email"
              />
            </div>
          )}
        />
      </div>
    </div>
  );
}
