import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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

  const toggleMortgageData = () => {
    if (!requireMortgage) {
      form.setValue("mortgageBroker", {
        name: "",
        address: "",
        phone: "",
        email: "",
      });
    } else {
      form.setValue("mortgageBroker", undefined);
    }
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="depositAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Deposit Amount</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
                placeholder="Enter deposit amount"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="depositDetails"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Deposit Details</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Please explain how you received this money"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="requireMortgage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Require Mortgage</FormLabel>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={() => {
                  toggleMortgageData();
                  field.onChange(!field.value);
                  console.log(form.watch("mortgageBroker"));
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {requireMortgage && (
        <>
          <FormField
            control={form.control}
            name="brokerContact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Are you happy to be contacted by our in house mortgage broker?
                </FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <h3 className="font-medium">Mortgage Broker Details</h3>
            <FormField
              control={form.control}
              name="mortgageBroker.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Broker Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter broker name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mortgageBroker.address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Broker Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter broker address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mortgageBroker.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Broker Phone</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter broker phone" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mortgageBroker.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Broker Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter broker email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
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
            <FormItem>
              <FormLabel>Solicitor Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter solicitor name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="solicitor.address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Solicitor Address</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter solicitor address" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="solicitor.phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Solicitor Phone</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter solicitor phone" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="solicitor.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Solicitor Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="Enter solicitor email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
