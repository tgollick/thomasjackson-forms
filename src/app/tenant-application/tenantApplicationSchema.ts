import * as z from "zod";

const dummyFile = new File([], "placeholder", {
  type: "application/octet-stream",
});

export const rentalApplicationSchema = z
  .object({
    // Property & Rental Details
    propertyAddress: z.string().nonempty("Property address is required"),
    rentalAmount: z.number({
      invalid_type_error: "Rental amount must be a number",
    }),
    moveInDate: z.string().nonempty("Move-in date is required"),

    // Personal Details
    fullName: z.string().nonempty("Full name is required"),
    currentAddress: z.string().nonempty("Current address is required"),
    postCode: z.string().nonempty("Postcode is required"),
    timeAtAddress: z.number({
      invalid_type_error: "Time at address must be a number",
    }),
    telephoneNumber: z.string().nonempty("Telephone number is required"),
    emailAddress: z.string().email("Invalid email address"),
    dateOfBirth: z.string().nonempty("Date of birth is required"),

    // Previous Addresses (optional array)
    previousAddresses: z
      .array(
        z.object({
          address: z.string().nonempty("Address is required"),
          postCode: z.string().nonempty("Postcode is required"),
          timeAtAddress: z.string().nonempty("Time at address is required"),
        })
      )
      .optional(),

    // Living Situation
    currentSituation: z.enum(
      ["homeowner", "rented", "livingAtHomeOrWithFriends"],
      {
        errorMap: () => ({ message: "Select a valid living situation" }),
      }
    ),
    // Only required if currentSituation === "rented"
    landlordDetails: z
      .object({
        name: z.string().nonempty("Landlord name is required"),
        address: z.string().nonempty("Landlord address is required"),
        telephone: z.string().nonempty("Landlord telephone is required"),
      })
      .optional(),

    // Household Information
    maritalStatus: z.enum(["single", "marriedOrPartner"], {
      errorMap: () => ({ message: "Select a valid marital status" }),
    }),
    householdDetails: z.string().nonempty("Household details are required"),

    // Pets & Smoking
    pets: z.string().optional(),
    smoker: z.boolean(),
    allowInspection: z.literal(true, {
      errorMap: () => ({ message: "You must agree to property inspections" }),
    }),

    // Moving & Document Proofs
    reasonForMoving: z.string().nonempty("Reason for moving is required"),
    proofOfAddress: z
      .custom<File>()
      .refine(
        (file) => file.name != "placeholder",
        "Proof of Address is required"
      )
      .refine((file) => file?.size <= 5_000_000, "Max file size is 5MB"),
    bankStatement: z
      .custom<File>()
      .refine(
        (file) => file.name != "placeholder",
        "Bank Statements is required"
      )
      .refine((file) => file?.size <= 5_000_000, "Max file size is 5MB"),
    id: z
      .custom<File>()
      .refine((file) => file.name != "placeholder", "ID is required")
      .refine((file) => file?.size <= 5_000_000, "Max file size is 5MB"),

    // Employment Details
    employmentStatus: z.enum(
      [
        "fullTime",
        "partTime",
        "seekingEmployment",
        "unemployed",
        "retired",
        "selfEmployed",
      ],
      { errorMap: () => ({ message: "Select a valid employment status" }) }
    ),
    workHours: z.number({
      invalid_type_error: "Work hours must be a number",
    }),

    // Employed Section (if applicable)
    employedDetails: z
      .object({
        jobTitle: z.string().nonempty("Job title is required"),
        companyName: z.string().nonempty("Company name is required"),
        employerAddress: z.string().nonempty("Employer address is required"),
        employerPostCode: z.string().nonempty("Employer postcode is required"),
        employerTelephone: z
          .string()
          .nonempty("Employer telephone is required"),
        employerEmail: z.string().email("Invalid employer email"),
        timeEmployed: z.string().nonempty("Time employed is required"),
        currentSalary: z.number({
          invalid_type_error: "Salary must be a number",
        }),
        nationalInsuranceNumber: z.string().nonempty("NI number is required"),
      })
      .optional(),

    // Previous Employer Details (if applicable)
    previousEmployer: z
      .object({
        jobTitle: z.string().nonempty("Previous job title is required"),
        companyName: z.string().nonempty("Previous company name is required"),
        employerAddress: z.string().nonempty("Employer address is required"),
        employerPostCode: z.string().nonempty("Employer postcode is required"),
        employerTelephone: z
          .string()
          .nonempty("Employer telephone is required"),
        employerEmail: z.string().email("Invalid employer email"),
        timeEmployed: z.string().nonempty("Time employed is required"),
        previousSalary: z.number({
          invalid_type_error: "Salary must be a number",
        }),
      })
      .optional(),

    // Self-Employed Details (if applicable)
    selfEmployedDetails: z
      .object({
        jobTitle: z.string().nonempty("Job title is required"),
        companyName: z.string().nonempty("Company name is required"),
        companyAddress: z.string().nonempty("Company address is required"),
        accountant: z.object({
          name: z.string().nonempty("Accountant name is required"),
          address: z.string().nonempty("Accountant address is required"),
          phone: z.string().nonempty("Accountant phone is required"),
          email: z.string().email("Invalid accountant email"),
        }),
        // Although our Prisma model had to mark this as optional due to database constraints,
        // we enforce that self-employed users supply accountant details in the form.
        businessReference: z.object({
          name: z.string().nonempty("Business reference name is required"),
          address: z
            .string()
            .nonempty("Business reference address is required"),
          phone: z.string().nonempty("Business reference phone is required"),
          email: z.string().email("Invalid business reference email"),
        }),
      })
      .optional(),

    // Financial & Legal Information
    countyCourtJudgements: z.boolean(),
    countyCourtDetails: z.string().optional(),
    bankruptOrInsolvent: z.boolean(),
    bankruptcyDate: z.string().optional(),
    evicted: z.boolean(),
    lateRentalPayments: z.boolean(),
    latePaymentDetails: z.string().optional(),

    // Guarantor Information
    guarantor: z
      .object({
        canProvide: z.boolean(),
        name: z.string().optional(),
        address: z.string().optional(),
        postCode: z.string().optional(),
        telephone: z.string().optional(),
        email: z.string().email().optional(),
        timeAtAddress: z.string().optional(),
        newAddressDetails: z
          .object({
            address: z.string().optional(),
            postCode: z.string().optional(),
            telephone: z.string().optional(),
            email: z.string().email().optional(),
          })
          .optional(),
        signature: z.string().optional(),
        date: z.string().optional(),
      })
      .optional(),

    // Utilities Arrears
    utilitiesArrears: z.object({
      councilTax: z.boolean(),
      electric: z.boolean(),
      water: z.boolean(),
      tvLicence: z.boolean(),
    }),

    debtsPayment: z
      .number({
        invalid_type_error: "Debt payment must be a number",
      })
      .optional(),

    // Next of Kin Details
    nextOfKin: z.object({
      name: z.string().nonempty("Next of kin name is required"),
      address: z.string().nonempty("Next of kin address is required"),
      contactDetails: z
        .string()
        .nonempty("Next of kin contact details are required"),
      relationship: z.string().nonempty("Relationship is required"),
    }),

    // Declaration
    declaration: z.object({
      printedName: z.string().nonempty("Printed name is required"),
      signature: z.string().nonempty("Signature is required"),
      date: z.string().nonempty("Date is required"),
    }),
  })
  .refine(
    (data) => {
      // If the living situation is "rented", landlordDetails must be provided.
      if (data.currentSituation === "rented" && !data.landlordDetails) {
        return false;
      }
      return true;
    },
    {
      message: "Landlord details are required when renting",
      path: ["landlordDetails"],
    }
  );

// Exporting the inferred TypeScript type
export type RentalApplicationForm = z.infer<typeof rentalApplicationSchema>;

export const defaultValues: RentalApplicationForm = {
  // Property & Rental Details
  propertyAddress: "",
  rentalAmount: 0,
  moveInDate: "",

  // Personal Details
  fullName: "",
  currentAddress: "",
  postCode: "",
  timeAtAddress: 0,
  telephoneNumber: "",
  emailAddress: "",
  dateOfBirth: "",

  // Previous Addresses
  previousAddresses: [],

  // Living Situation
  currentSituation: "homeowner",
  landlordDetails: undefined,

  // Household Information
  maritalStatus: "single",
  householdDetails: "",

  // Pets & Smoking
  pets: "",
  smoker: false,
  allowInspection: true,

  // Moving & Document Proofs
  reasonForMoving: "",
  proofOfAddress: dummyFile,
  bankStatement: dummyFile,
  id: dummyFile,

  // Employment Details
  employmentStatus: "fullTime",
  workHours: 0,

  // Employed Section
  employedDetails: {
    jobTitle: "",
    companyName: "",
    employerAddress: "",
    employerPostCode: "",
    employerTelephone: "",
    employerEmail: "",
    timeEmployed: "",
    currentSalary: 0,
    nationalInsuranceNumber: "",
  },

  // Previous Employer Details
  previousEmployer: undefined,

  // Self-Employed Section
  selfEmployedDetails: undefined,

  // Financial & Legal Information
  countyCourtJudgements: false,
  countyCourtDetails: "",
  bankruptOrInsolvent: false,
  bankruptcyDate: "",
  evicted: false,
  lateRentalPayments: false,
  latePaymentDetails: "",

  // Guarantor Information
  guarantor: undefined,

  // Utilities Arrears
  utilitiesArrears: {
    councilTax: false,
    electric: false,
    water: false,
    tvLicence: false,
  },

  debtsPayment: 0,

  // Next of Kin Details
  nextOfKin: {
    name: "",
    address: "",
    contactDetails: "",
    relationship: "",
  },

  // Declaration
  declaration: {
    printedName: "",
    signature: "",
    date: "",
  },
};

export const propertyRentalDetailsSchema = z.object({
  propertyAddress: z.string().nonempty("Property address is required"),
  rentalAmount: z.number({
    invalid_type_error: "Rental amount must be a number",
  }),
  moveInDate: z.string().nonempty("Move-in date is required"),
});

export const personalDetailsSchema = z.object({
  fullName: z.string().nonempty("Full name is required"),
  currentAddress: z.string().nonempty("Current address is required"),
  postCode: z.string().nonempty("Postcode is required"),
  timeAtAddress: z.number({
    invalid_type_error: "Time at address must be a number",
  }),
  telephoneNumber: z.string().nonempty("Telephone number is required"),
  emailAddress: z.string().email("Invalid email address"),
  dateOfBirth: z.string().nonempty("Date of birth is required"),
});

export const previousAddressesSchema = z.object({
  previousAddresses: z
    .array(
      z.object({
        address: z.string().nonempty("Address is required"),
        postCode: z.string().nonempty("Postcode is required"),
        timeAtAddress: z.string().nonempty("Time at address is required"),
      })
    )
    .optional(),
});

export const livingSituationSchema = z.object({
  currentSituation: z.enum(
    ["homeowner", "rented", "livingAtHomeOrWithFriends"],
    {
      errorMap: () => ({ message: "Select a valid living situation" }),
    }
  ),
  landlordDetails: z
    .object({
      name: z.string().nonempty("Landlord name is required"),
      address: z.string().nonempty("Landlord address is required"),
      telephone: z.string().nonempty("Landlord telephone is required"),
    })
    .optional(),
});

export const householdInformationSchema = z.object({
  maritalStatus: z.enum(["single", "marriedOrPartner"], {
    errorMap: () => ({ message: "Select a valid marital status" }),
  }),
  householdDetails: z.string().nonempty("Household details are required"),
});

export const petsSmokingSchema = z.object({
  pets: z.string().optional(),
  smoker: z.boolean(),
  allowInspection: z.literal(true, {
    errorMap: () => ({ message: "You must agree to property inspections" }),
  }),
});

export const movingAndProofsSchema = z.object({
  reasonForMoving: z.string().nonempty("Reason for moving is required"),
  proofOfAddress: z
    .custom<File>()
    .refine(
      (file) => file.name != "placeholder",
      "Proof of Address is required"
    )
    .refine((file) => file?.size <= 5_000_000, "Max file size is 5MB"),
  bankStatement: z
    .custom<File>()
    .refine((file) => file.name != "placeholder", "Bank Statements is required")
    .refine((file) => file?.size <= 5_000_000, "Max file size is 5MB"),
  id: z
    .custom<File>()
    .refine((file) => file.name != "placeholder", "ID is required")
    .refine((file) => file?.size <= 5_000_000, "Max file size is 5MB"),
});

export const employmentDetailsSchema = z.object({
  employmentStatus: z.enum(
    [
      "fullTime",
      "partTime",
      "seekingEmployment",
      "unemployed",
      "retired",
      "selfEmployed",
    ],
    { errorMap: () => ({ message: "Select a valid employment status" }) }
  ),
  workHours: z.number({
    invalid_type_error: "Work hours must be a number",
  }),
});

export const employedDetailsSchema = z.object({
  employedDetails: z
    .object({
      jobTitle: z.string().nonempty("Job title is required"),
      companyName: z.string().nonempty("Company name is required"),
      employerAddress: z.string().nonempty("Employer address is required"),
      employerPostCode: z.string().nonempty("Employer postcode is required"),
      employerTelephone: z.string().nonempty("Employer telephone is required"),
      employerEmail: z.string().email("Invalid employer email"),
      timeEmployed: z.string().nonempty("Time employed is required"),
      currentSalary: z.number({
        invalid_type_error: "Salary must be a number",
      }),
      nationalInsuranceNumber: z.string().nonempty("NI number is required"),
    })
    .optional(),
});

export const previousEmployerSchema = z.object({
  previousEmployer: z
    .object({
      jobTitle: z.string().nonempty("Previous job title is required"),
      companyName: z.string().nonempty("Previous company name is required"),
      employerAddress: z.string().nonempty("Employer address is required"),
      employerPostCode: z.string().nonempty("Employer postcode is required"),
      employerTelephone: z.string().nonempty("Employer telephone is required"),
      employerEmail: z.string().email("Invalid employer email"),
      timeEmployed: z.string().nonempty("Time employed is required"),
      previousSalary: z.number({
        invalid_type_error: "Salary must be a number",
      }),
    })
    .optional(),
});

export const selfEmployedDetailsSchema = z.object({
  selfEmployedDetails: z
    .object({
      jobTitle: z.string().nonempty("Job title is required"),
      companyName: z.string().nonempty("Company name is required"),
      companyAddress: z.string().nonempty("Company address is required"),
      accountant: z.object({
        name: z.string().nonempty("Accountant name is required"),
        address: z.string().nonempty("Accountant address is required"),
        phone: z.string().nonempty("Accountant phone is required"),
        email: z.string().email("Invalid accountant email"),
      }),
      businessReference: z.object({
        name: z.string().nonempty("Business reference name is required"),
        address: z.string().nonempty("Business reference address is required"),
        phone: z.string().nonempty("Business reference phone is required"),
        email: z.string().email("Invalid business reference email"),
      }),
    })
    .optional(),
});

export const financialLegalSchema = z.object({
  countyCourtJudgements: z.boolean(),
  countyCourtDetails: z.string().optional(),
  bankruptOrInsolvent: z.boolean(),
  bankruptcyDate: z.string().optional(),
  evicted: z.boolean(),
  lateRentalPayments: z.boolean(),
  latePaymentDetails: z.string().optional(),
});

export const guarantorSchema = z.object({
  guarantor: z
    .object({
      canProvide: z.boolean(),
      name: z.string().optional(),
      address: z.string().optional(),
      postCode: z.string().optional(),
      telephone: z.string().optional(),
      email: z.string().email().optional(),
      timeAtAddress: z.string().optional(),
      newAddressDetails: z
        .object({
          address: z.string().optional(),
          postCode: z.string().optional(),
          telephone: z.string().optional(),
          email: z.string().email().optional(),
        })
        .optional(),
      signature: z.string().optional(),
      date: z.string().optional(),
    })
    .optional(),
});

export const utilitiesArrearsSchema = z.object({
  utilitiesArrears: z.object({
    councilTax: z.boolean(),
    electric: z.boolean(),
    water: z.boolean(),
    tvLicence: z.boolean(),
  }),
});

export const debtsPaymentSchema = z.object({
  debtsPayment: z.number().optional(),
});

export const nextOfKinSchema = z.object({
  nextOfKin: z.object({
    name: z.string().nonempty("Next of kin name is required"),
    address: z.string().nonempty("Next of kin address is required"),
    contactDetails: z
      .string()
      .nonempty("Next of kin contact details are required"),
    relationship: z.string().nonempty("Relationship is required"),
  }),
});

export const declarationSchema = z.object({
  declaration: z.object({
    printedName: z.string().nonempty("Printed name is required"),
    signature: z.string().nonempty("Signature is required"),
    date: z.string().nonempty("Date is required"),
  }),
});
