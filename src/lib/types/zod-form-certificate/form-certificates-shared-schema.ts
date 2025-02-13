import { z } from 'zod';

// 1. Registry Number (Enforces "YYYY-numbers" and validates the year range)
export const registryNumberSchema = z
  .string()
  .regex(/^\d{4}-\d+$/, 'Registry number must be in format: YYYY-numbers')
  .refine(
    (value) => {
      const year = parseInt(value.split('-')[0], 10);
      const currentYear = new Date().getFullYear();
      return year >= 1945 && year <= currentYear;
    },
    {
      message: 'The year must be between 1945 and the current year.',
    }
  );

// 2. Province (Non-empty string)
export const provinceSchema = z.string().nonempty('Province is required');

// 3. City/Municipality (Non-empty string)
export const cityMunicipalitySchema = z
  .string()
  .nonempty('City/Municipality is required');

// ─────────────────────────────────────────────────────────────────────────────
// PROCESSING DETAILS: "Prepared By", "Received By", "Registered By"
// Each has Signature, Name in Print, Title/Position, and Date
// ─────────────────────────────────────────────────────────────────────────────
export const signatoryDetailsSchema = z.object({
  signature: z.string().nonempty('Signature is required'),
  nameInPrint: z.string().nonempty('Name in print is required'),
  titleOrPosition: z.string().nonempty('Title or position is required'),
  date: z.string().nonempty('Date is required'),
});

// If you want a single object that includes all three sets (Prepared, Received, Registered):
export const processingDetailsSchema = z.object({
  preparedBy: signatoryDetailsSchema,
  receivedBy: signatoryDetailsSchema,
  registeredBy: signatoryDetailsSchema,
});

// ─────────────────────────────────────────────────────────────────────────────
// COMMON PERSONAL DATA FIELDS
// ─────────────────────────────────────────────────────────────────────────────

// Name (First, Middle, Last)
export const nameSchema = z.object({
  first: z.string().nonempty('First name is required'),
  middle: z.string().optional(), // Middle name can be optional
  last: z.string().nonempty('Last name is required'),
});

// Citizenship
export const citizenshipSchema = z.string().nonempty('Citizenship is required');

// Religion/Religious Sect
export const religionSchema = z
  .string()
  .nonempty('Religion/Religious Sect is required');

// Residence (House No., Street, Barangay, City/Municipality, Province, Country)
export const residenceSchema = z.object({
  houseNo: z.string().nonempty('House number is required'),
  st: z.string().nonempty('Street is required'),
  barangay: z.string().nonempty('Barangay is required'),
  cityMunicipality: cityMunicipalitySchema, // Reuse shared city/municipality schema
  province: provinceSchema, // Reuse shared province schema
  country: z.string().nonempty('Country is required'),
});

// ─────────────────────────────────────────────────────────────────────────────
// PARENT INFORMATION
// (Father's Name, Mother's Name) - Both are nameSchema
// ─────────────────────────────────────────────────────────────────────────────
export const parentInfoSchema = z.object({
  fatherName: nameSchema,
  motherName: nameSchema,
});

// ─────────────────────────────────────────────────────────────────────────────
// ADMINISTRATIVE
// Remarks/Annotations, Late Registration Option, Document Status
// ─────────────────────────────────────────────────────────────────────────────

// Remarks/Annotations (optional text)
export const remarksAnnotationsSchema = z.string().optional();

// Late Registration Option (could be a boolean or an enum/string depending on your UI)
export const lateRegistrationOptionSchema = z.boolean().optional();

// Document Status (e.g., 'Draft', 'Final', 'Archived'—adjust as needed)
export const documentStatusSchema = z
  .string()
  .nonempty('Document status is required');
