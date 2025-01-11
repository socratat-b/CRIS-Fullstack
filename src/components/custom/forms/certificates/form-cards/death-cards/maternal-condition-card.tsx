import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DeathCertificateFormValues } from '@/lib/types/zod-form-certificate/formSchemaCertificate';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const MaternalConditionCard: React.FC = () => {
  const { control, watch } = useFormContext<DeathCertificateFormValues>();
  const sex = watch('sex'); // Watch for the 'sex' field

  return (
    sex === 'Female' && (
      <Card>
        <CardHeader>
          <CardTitle>Maternal Condition</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={control}
            name='maternalCondition'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maternal Condition</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select maternal condition' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='pregnant_not_in_labour'>
                      Pregnant, not in labour
                    </SelectItem>
                    <SelectItem value='pregnant_in_labour'>
                      Pregnant, in labour
                    </SelectItem>
                    <SelectItem value='less_than_42_days'>
                      Less than 42 days after delivery
                    </SelectItem>
                    <SelectItem value='42_days_to_1_year'>
                      42 days to 1 year after delivery
                    </SelectItem>
                    <SelectItem value='none'>None of the choices</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    )
  );
};

export default MaternalConditionCard;
