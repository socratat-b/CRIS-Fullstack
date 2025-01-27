import { BirthCertificateFormValues } from "@/lib/types/zod-form-certificate/birth-certificate-form-schema";
import { formatDateTime } from "@/utils/date";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";
import { styles } from "./styles";
import { back } from "./back";

// Define styles for the PDF
interface BirthCertificatePDFProps {
  data: Partial<BirthCertificateFormValues>;
}

const BirthCertificatePDF: React.FC<BirthCertificatePDFProps> = ({ data }) => {
  if (!Object.entries(data).length) {
    return (
      <Document>
        <Page size="LEGAL" style={styles.page}>
          <View>
            <Text>No data available for preview.</Text>
          </View>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      {/* Additional Pages */}
      <Page size="LEGAL" style={[back.page]}>
        <View style={back.container}>
          <View style={[back.container, back.page]}>
            <View style={back.columnContainer}>
              <Text style={[back.headerTitle]}>
                AFFIDAVIT OF ACKNOWLEDGEMENT/ADMISSION OF PATERNITY
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  width: "100%",
                  fontSize: 8,
                }}
              >
                <Text style={back.headerSubtitle}>
                  (For births before 3 August 1988)
                </Text>
                <Text style={back.headerSubtitle}>
                  (For births on or after 3 August 1988)
                </Text>
              </View>
            </View>
            <View style={[back.formRow, { marginTop: 15 }]}>
              <Text style={[back.textStyle, { marginLeft: 40 }]}>I/We,</Text>
              <Text style={[back.textStyle, back.formField]}>{"Jane Doe"}</Text>
              <Text style={[back.textStyle, { marginLeft: 12 }]}>and</Text>
              <Text style={[back.textStyle, back.formField]}>{"Jane Doe"}</Text>
              ,
            </View>
            <View style={back.formRow}>
              <Text style={[back.textStyle, { marginRight: 12 }]}>
                of legal age, am/are the natural mother and/or father off:
              </Text>
              <Text style={[back.textStyle, back.formFieldWide]}>
                {"Jane Doe"}
              </Text>
              ,
              <Text style={[back.textStyle, { marginLeft: 12 }]}>who was </Text>
            </View>
            <View style={back.formRow}>
              <Text style={[back.textStyle, { marginRight: 12 }]}>
                born on:
              </Text>
              <Text
                style={[back.textStyle, back.signatureText, { marginLeft: 12 }]}
              >
                {"Jane Doe"}
              </Text>
              <Text style={[back.textStyle, { marginLeft: 12 }]}>at</Text>
              <Text style={[back.textStyle, back.formFieldWider]}>
                {"Jane Doe"}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 15,
              }}
            >
              <Text style={[back.textStyle, { marginLeft: 40 }]}>
                I am / We are executing this affidavit to attest to the
                truthfulness of the foregoing statements and for purposes
              </Text>
              <Text style={[back.textStyle]}>
                of acknowledgement my/our child.
              </Text>
            </View>
            <View style={[back.rowContainer, { marginTop: 15 }]}>
              <View style={back.signatureBlock}>
                <Text style={[back.textStyle, back.signatureText]}>
                  {"Jane Doe"}
                </Text>
                <Text style={[back.textStyle, back.captionText]}>
                  (Signature Over Printed Name of Father)
                </Text>
              </View>
              <View style={back.signatureBlock}>
                <Text style={[back.textStyle, back.signatureText]}>
                  {"Jane Doe"}
                </Text>
                <Text style={[back.textStyle, back.captionText]}>
                  (Signature Over Printed Name of Mother)
                </Text>
              </View>
            </View>
            <View style={[back.formRow, { marginTop: 15 }]}>
              <Text
                style={[back.textStyle, { marginRight: 20, marginLeft: 40 }]}
              >
                <Text
                  style={[
                    back.headerTitle,
                    { fontSize: 10, textTransform: "uppercase" },
                  ]}
                >
                  Subscribed and sworn
                </Text>
                <Text style={[back.textStyle]}> to before me this </Text>
              </Text>
              <Text
                style={[
                  back.textStyle,
                  back.signatureText,
                  { marginLeft: 12, width: 70 },
                ]}
              >
                {"Jane Doe"}
              </Text>
              <Text style={[back.textStyle, { marginLeft: 12 }]}>day of</Text>
              <Text
                style={[back.textStyle, back.formFieldWider, { width: 150 }]}
              >
                {"Jane Doe"}
              </Text>
              <Text style={[back.textStyle]}>,</Text>
              <Text
                style={[
                  back.textStyle,
                  back.signatureText,
                  { marginLeft: 12, width: 70 },
                ]}
              >
                {"Jane Doe"}
              </Text>
            </View>
            <View style={[back.formRow]}>
              <Text style={[back.textStyle]}>
                <Text style={[back.textStyle]}>by </Text>
              </Text>
              <Text
                style={[back.textStyle, back.signatureText, { width: 180 }]}
              >
                {"Jane Doe"}
              </Text>
              <Text style={[back.textStyle, { marginLeft: 10 }]}>and</Text>
              <Text
                style={[
                  back.textStyle,
                  back.signatureText,
                  { marginLeft: 10, width: 180 },
                ]}
              >
                {"Jane Doe"}
              </Text>
              <Text style={[back.textStyle]}>,</Text>
              <Text style={[back.textStyle, { marginLeft: 10 }]}>
                who exhibited to me his/her
              </Text>
            </View>
            <View style={[back.formRow]}>
              <Text style={[back.textStyle]}>CTC/valid ID: </Text>
              <Text
                style={[back.textStyle, back.signatureText, { width: "30%" }]}
              >
                {"Jane Doe"}
              </Text>
              <Text style={[back.textStyle, { marginLeft: 10 }]}>issued on  </Text>
              <Text
                style={[back.textStyle, back.signatureText, { width: "40%" }]}
              >
                {"Jane Doe"}
              </Text>

            </View>
            <View style={[back.formRow]}>
              <Text style={[back.textStyle]}>at  </Text>
              <Text
                style={[back.textStyle, back.signatureText, { width: "40%" }]}
              >
                {"Jane Doe"}
              </Text>
            </View>
            <View style={[back.rowContainer, { marginTop: 40 }]}>
              <View style={back.signatureBlock}>
                <Text style={[back.textStyle, back.signatureText]}>
                  {"Jane Doe"}
                </Text>
                <Text style={[back.textStyle, back.captionText]}>
                  (Signature of the Administering Officer)
                </Text>
              </View>
              <View style={back.signatureBlock}>
                <Text style={[back.textStyle, back.signatureText]}>
                  {"Jane Doe"}
                </Text>
                <Text style={[back.textStyle, back.captionText]}>
                  (Position/Title Designation)
                </Text>
              </View>
            </View>
            <View style={[back.rowContainer, { marginTop: 20 }]}>
              <View style={back.signatureBlock}>
                <Text style={[back.textStyle, back.signatureText]}>
                  {"Jane Doe"}
                </Text>
                <Text style={[back.textStyle, back.captionText]}>
                  (Name in Print)
                </Text>
              </View>
              <View style={back.signatureBlock}>
                <Text style={[back.textStyle, back.signatureText]}>
                  {"Jane Doe"}
                </Text>
                <Text style={[back.textStyle, back.captionText]}>
                  (Address)
                </Text>
              </View>
            </View>
          </View>
          <View style={[back.container, back.page]}>
            <View style={back.columnContainer}>
              <Text style={[back.headerTitle]}>
                AFFIDAVIT FOR DELAYED REGISTRATION OF BIRTH
              </Text>

              <Text style={back.headerSubtitle}>
                (To be accomplished by the hospital/clinic administrator,
                father, mother, or guardian or the person himself if 18 years
                old or over.)
              </Text>
            </View>
            <View style={[back.formRow, { marginTop: 15 }]}>
              <Text style={[back.textStyle, { marginLeft: 40 }]}>I </Text>
              <Text style={[back.textStyle, back.formField]}>{"Jane Doe"}</Text>
              <Text style={[back.textStyle, { marginLeft: 12 }]}>
                of legal age, single/married/divorced/widow/widower, with
              </Text>
            </View>
            <View style={[back.formRow]}>
              <Text style={[back.textStyle, { paddingRight: 10 }]}>
                residence and postal address at
              </Text>
              <Text
                style={[
                  back.textStyle,
                  back.formField,
                  { width: "80%", flexWrap: "wrap" },
                ]}
              >
                {"Jane Doe"}
              </Text>
            </View>
            <View style={back.formRow}>
              <Text style={[back.textStyle, { paddingRight: 12 }]}>
                after having been duly sworn in accordance with law, do hereby
                depose and say:
              </Text>
            </View>
            <View
              style={[
                back.columnContainer,
                { marginLeft: 40, marginTop: 15, alignItems: "flex-start" },
              ]}
            >
              <View style={[back.columnContainer, { alignItems: "flex-start" },]}>
                <Text style={[back.textStyle]}>
                  1. That I am the applicant for the delayed registration of:
                </Text>
                <View style={[back.formRow, { marginLeft: 20 }]}>
                  <View style={back.radio}>
                    {/* If this option is selected, uncomment the below View to fill the circle */}
                  </View>
                  <Text style={[back.textStyle]}>My birth in</Text>
                  <Text
                    style={[back.textStyle, back.signatureText, { marginLeft: 12, flexWrap: "wrap", width: "35%" },]}
                  >
                    {"Jane Doe"}
                  </Text>
                  <Text style={[back.textStyle, { paddingRight: 12 }]}>on</Text>
                  <Text style={[back.textStyle, back.signatureText, { marginLeft: 12, flexWrap: "wrap", width: "35%", paddingRight: 12 }]}>
                    {"Jane Doe"}
                  </Text>
                </View>
                <View style={[back.formRow, { marginLeft: 20 }]}>
                  <View style={back.radio}>
                    {/* If this option is selected, uncomment the below View to fill the circle */}
                  </View>
                  <Text style={[back.textStyle]}>the birth of</Text>
                  <Text
                    style={[back.textStyle, back.signatureText, { marginLeft: 12, flexWrap: "wrap", width: "35%" },]}
                  >
                    {"Jane Doe"}
                  </Text>
                  <Text style={[back.textStyle, { paddingRight: 12 }]}>who was born in</Text>
                  <Text style={[back.textStyle, back.signatureText, { flexWrap: "wrap", width: "25%", paddingRight: 12 }]}>
                    {"Jane Doe"}
                  </Text>

                </View>
                <View style={[back.formRow, { marginLeft: 20 }]}>
                  <Text style={[back.textStyle, { paddingRight: 12 }]}>on</Text>
                  <Text style={[back.textStyle, back.signatureText, { flexWrap: "wrap", width: "35%", paddingRight: 12 }]}>
                    {"Jane Doe"}
                  </Text>
                </View>
                <View style={[back.formRow, { alignItems: "flex-start", flexWrap: "wrap", },]}>
                  <Text style={[back.textStyle]}>
                    2. That I/he/she was attended at birth by
                  </Text>
                  <Text style={[back.textStyle, back.signatureText, { marginLeft: 12, width: "55%", paddingRight: 12 }]}>
                    {"Jane Doe"}
                  </Text>
                </View>
                <View style={[back.formRow, { flexWrap: "wrap", paddingLeft: 20 },]}>
                  <Text style={[back.textStyle]}>
                    who resides at
                  </Text>
                  <Text style={[back.textStyle, back.signatureText, { marginLeft: 12, width: "60%", paddingRight: 12 }]}>
                    {"Jane Doe"}
                  </Text>
                </View>
                <View style={[back.formRow, { alignItems: "flex-start", flexWrap: "wrap", },]}>
                  <Text style={[back.textStyle]}>
                    3. That I am /he/she is a citizen of
                  </Text>
                  <Text style={[back.textStyle, back.signatureText, { marginLeft: 12, width: "55%", paddingRight: 12 }]}>
                    {"Jane Doe"}
                  </Text>
                </View>
                <View style={[back.formRow, { flexWrap: "wrap", },]}>
                  <Text style={[back.textStyle]}>
                    4. That my/his/her parents were
                  </Text>
                  <View style={[back.formRow, { marginLeft: 20 }]}>
                    <View style={back.radio}>
                      {/* If this option is selected, uncomment the below View to fill the circle */}
                    </View>
                    <Text style={[back.textStyle]}>married on</Text>
                    <Text
                      style={[back.textStyle, back.signatureText, { marginLeft: 12, flexWrap: "wrap", width: "35%" },]}
                    >
                      {"Jane Doe"}
                    </Text>
                    <Text style={[back.textStyle, { paddingRight: 12 }]}>at</Text>
                    <Text style={[back.textStyle, back.signatureText, { marginLeft: 12, flexWrap: "wrap", width: "35%", paddingRight: 12 }]}>
                      {"Jane Doe"}
                    </Text>
                  </View>
                  <View style={[back.formRow, { marginLeft: 20 }]}>
                    <View style={back.radio}>
                      {/* If this option is selected, uncomment the below View to fill the circle */}
                    </View>
                    <Text style={[back.textStyle]}>not marriead but I/he/she was acknowledged/not acknowledged by my/his/her  </Text>

                  </View>
                  <View style={[back.formRow, { marginLeft: 20 }]}>
                    <Text style={[back.textStyle, { paddingRight: 12 }]}>father whose name is</Text>
                    <Text
                      style={[back.textStyle, back.signatureText, { flexWrap: "wrap", width: "70%" },]}
                    >
                      {"Jane Doe"}
                    </Text>
                  </View>
                  <View style={[back.formRow, { marginTop: 15, alignItems: "flex-start", flexWrap: "wrap", },]}>
                    <Text style={[back.textStyle]}>
                      5. That the reason for the delay in registering my/his/her birth was
                    </Text>
                    <Text style={[back.textStyle, back.signatureText, { marginLeft: 12, width: "90%" }]}>
                      {"Jane Doe"}
                    </Text>
                  </View>
                  <View style={[back.formRow, { justifyContent: "center", alignItems: "flex-end" },]}>
                    <Text style={[back.textStyle]}>
                      6. (For the applicant only) That I am married to
                    </Text>
                    <Text style={[back.textStyle, back.signatureText, { marginLeft: 12, width: "45%" }]}>
                      {""}
                    </Text>
                  </View>

                  <View style={[back.formRow, { marginTop: 10, alignItems: "flex-end", flexWrap: "wrap" }]}>
                    <Text style={[back.textStyle]}>
                      (If the applicant is other than the document owner) That I am the
                    </Text>
                    <Text style={[back.textStyle, back.signatureText, { marginLeft: 12, width: "30%" }]}>
                      {""}
                    </Text>
                    <Text style={[back.textStyle]}>of the said person.</Text>
                  </View>

                  <View style={[back.formRow, { marginTop: 15, paddingRight: 12, alignItems: "flex-end", flexWrap: "wrap" }]}>
                    <Text style={[back.textStyle]}>
                      7. That I am executing this affidavit to attest to the truthfulness of the foregoing statements for all legal
                    </Text>
                    <Text style={back.textStyle}>intents and purposes.</Text>
                  </View>

                  <View style={[back.formRow, { flexWrap: "wrap", alignItems: "flex-end" }]}>
                    <Text style={[back.textStyle]}>In truth whereof, I have affixed my signature below this</Text>
                    <Text style={[back.textStyle, back.signatureText, { marginLeft: 8, width: "10%" }]}>
                      {""}
                    </Text>
                    <Text style={[back.textStyle]}>day of</Text>
                    <Text style={[back.textStyle, back.signatureText, { marginLeft: 8, width: "25%" }]}>
                      {""}
                    </Text>
                    <Text style={[back.textStyle]}>at</Text>
                    <Text style={[back.textStyle, back.signatureText, { marginLeft: 8, width: "30%" }]}>
                      {""}
                    </Text>
                    <Text style={[back.textStyle]}>, Philippines.</Text>
                  </View>

                  <View style={[back.formRow, { justifyContent: "space-between", marginTop: 40 }]}>
                    <View style={{ alignItems: "center", width: "45%", }}>
 
                    </View>
                    <View style={{ alignItems: "center", width: "45%" }}>
                      <Text style={[back.textStyle, back.signatureText, { width: "100%", textAlign: "center" }]}>
                        {""}
                      </Text>
                      <Text style={[back.textStyle, { fontSize: 8, textAlign: "center" }]}>
                        Signature of the Administering Officer
                      </Text>
                    </View>

                  </View>


                  <View style={[back.formRow, { flexWrap: "wrap", alignItems: "flex-end" }]}>
                    <Text style={[back.textStyle]}>SUBSCRIBED AND SWORN to before me this</Text>
                    <Text style={[back.textStyle, back.signatureText, { marginLeft: 8, width: "10%" }]}>
                      {""}
                    </Text>
                    <Text style={[back.textStyle]}>day of</Text>
                    <Text style={[back.textStyle, back.signatureText, { marginLeft: 8, width: "25%" }]}>
                      {""}
                    </Text>
                    <Text style={[back.textStyle]}>at</Text>
                    <Text style={[back.textStyle, back.signatureText, { marginLeft: 8, width: "30%" }]}>
                      {""}
                    </Text>
                    <Text style={[back.textStyle]}>, Philippines, affiant who exhibited to me his/her C.T.C/valid ID</Text>
                  </View>

                  <View style={[back.formRow, { marginTop: 10, alignItems: "flex-end", flexWrap: "wrap" }]}>
                    <Text style={[back.textStyle]}>issued on</Text>
                    <Text style={[back.textStyle, back.signatureText, { marginLeft: 8, width: "30%" }]}>
                      {""}
                    </Text>
                    <Text style={[back.textStyle]}>at</Text>
                    <Text style={[back.textStyle, back.signatureText, { marginLeft: 8, width: "40%" }]}>
                      {""}
                    </Text>
                  </View>

                  <View style={[back.formRow, { justifyContent: "space-between", marginTop: 40 }]}>
                    <View style={{ alignItems: "center", width: "45%" }}>
                      <Text style={[back.textStyle, back.signatureText, { width: "100%", textAlign: "center" }]}>
                        {""}
                      </Text>
                      <Text style={[back.textStyle, { fontSize: 8, textAlign: "center" }]}>
                        Signature of the Administering Officer
                      </Text>
                    </View>
                    <View style={{ alignItems: "center", width: "45%" }}>
                      <Text style={[back.textStyle, back.signatureText, { width: "100%", textAlign: "center" }]}>
                        {""}
                      </Text>
                      <Text style={[back.textStyle, { fontSize: 8, textAlign: "center" }]}>
                        Position / Title / Designation
                      </Text>
                    </View>
                  </View>



                </View>

              </View>
            </View>
          </View>
        </View>
      </Page>

      <Page size="LEGAL" style={styles.page}>
        {/* Parent Grid Container */}
        <View style={{ border: "1px solid #000" }}>
          <View style={[styles.header, { padding: 5 }]}>
            <View style={styles.municipal}>
              <Text>Municipal Form No. 102</Text>
              <Text style={styles.headerNote1}>Revised August 2016</Text>
            </View>
            <View style={styles.republic}>
              <Text style={styles.headerSubtitle}>
                Republic of the Philippines
              </Text>
              <Text style={styles.headerSubtitle}>
                OFFICE OF THE CIVIL REGISTRAR GENERAL
              </Text>
              <Text style={styles.headerTitle}>CERTIFICATE OF LIVE BIRTH</Text>
            </View>
            <View>
              <Text style={styles.headerNote2}>
                (To be accomplished in quadruplicate using black ink)
              </Text>
            </View>
          </View>
          {/* Registry Information */}
          <View>
            <View style={styles.gridContainer}>
              {/* Left Grid: Province and City/Municipality */}
              <View style={styles.leftGrid}>
                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>Province:</Text>
                  <Text style={styles.value}>{data.province || ""}</Text>
                </View>
                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>City/Municipality:</Text>
                  <Text style={styles.value}>
                    {data.cityMunicipality || ""}
                  </Text>
                </View>
              </View>

              {/* Right Grid: Registry No. */}
              <View style={styles.rightGrid}>
                <View style={styles.registryNoContainer}>
                  <Text style={styles.label}>Registry No.:</Text>
                  <Text style={styles.value}>{data.registryNumber || ""}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Child Information */}
          <View>
            <View style={styles.gridContainer}>
              <View style={styles.childLabelGrid}>
                <Text style={styles.verticalText}>
                  C{"\n"}H{"\n"}I{"\n"}L{"\n"}D
                </Text>
              </View>
              <View style={styles.leftGrid}>
                {/* Name Field */}
                <View style={styles.nameFieldContainer}>
                  <Text style={styles.nameLabel}>Name:</Text>
                  <View style={styles.nameInputContainer}>
                    <Text style={styles.nameInput}>(First Name)</Text>
                    <Text style={styles.nameInput}>(Middle Name)</Text>
                    <Text style={styles.nameInput}>(Last Name)</Text>
                  </View>
                  <View style={styles.nameInputContainer}>
                    <Text style={styles.nameInput}>
                      {data.childInfo?.firstName || ""}
                    </Text>
                    <Text style={styles.nameInput}>
                      {data.childInfo?.middleName || ""}
                    </Text>
                    <Text style={styles.nameInput}>
                      {data.childInfo?.lastName || ""}
                    </Text>
                  </View>
                </View>

                {/* Sex and Date of Birth Field */}
                <View
                  style={{
                    flexDirection: "row",
                    borderBottom: "1px solid #000",
                  }}
                >
                  <View style={styles.sexGrid}>
                    <Text style={styles.sexLabel}>Sex:</Text>
                    <Text style={styles.sexValue}>
                      {data.childInfo?.sex || ""}
                    </Text>
                  </View>
                  <View style={{ width: "85%" }}>
                    <View style={styles.dateFieldContainer}>
                      <Text style={styles.dateLabel}>Date of Birth:</Text>
                      <View style={styles.dateInputContainer}>
                        <Text style={styles.dateInput}>(Month)</Text>
                        <Text style={styles.dateInput}>(Day)</Text>
                        <Text style={styles.dateInput}>(Year)</Text>
                      </View>
                      <View style={styles.dateInputContainer}>
                        <Text style={styles.dateInput}>
                          {data.childInfo?.dateOfBirth
                            ? new Date(data.childInfo.dateOfBirth).getMonth() +
                            1
                            : ""}
                        </Text>
                        <Text style={styles.dateInput}>
                          {data.childInfo?.dateOfBirth
                            ? new Date(data.childInfo.dateOfBirth).getDate()
                            : ""}
                        </Text>
                        <Text style={styles.dateInput}>
                          {data.childInfo?.dateOfBirth
                            ? new Date(data.childInfo.dateOfBirth).getFullYear()
                            : ""}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Place of Birth Field */}
                <View style={styles.placeOfBirthContainer}>
                  <View style={styles.placeOfBirthColumn}>
                    <Text style={styles.placeOfBirthLabel}>Hospital:</Text>
                    <Text style={styles.placeOfBirthValue}>
                      {data.childInfo?.placeOfBirth?.hospital || ""}
                    </Text>
                  </View>
                  <View style={styles.placeOfBirthColumn}>
                    <Text style={styles.placeOfBirthLabel}>
                      City/Municipality:
                    </Text>
                    <Text style={styles.placeOfBirthValue}>
                      {data.childInfo?.placeOfBirth?.cityMunicipality || ""}
                    </Text>
                  </View>
                  <View style={styles.placeOfBirthColumn}>
                    <Text style={styles.placeOfBirthLabel}>Province:</Text>
                    <Text style={styles.placeOfBirthValue}>
                      {data.childInfo?.placeOfBirth?.province || ""}
                    </Text>
                  </View>
                </View>

                {/* Bottom Grid: Type of Birth, Multiple Birth, Birth Order, Weight at Birth */}
                <View style={styles.bottomGridContainer}>
                  <View style={styles.bottomGridColumn}>
                    <Text style={styles.bottomGridLabel}>Type of Birth:</Text>
                    <Text style={styles.bottomGridValue}>
                      {data.childInfo?.typeOfBirth || ""}
                    </Text>
                  </View>
                  <View style={styles.bottomGridColumn}>
                    <Text style={styles.bottomGridLabel}>
                      Multiple Birth Order:
                    </Text>
                    <Text style={styles.bottomGridValue}>
                      {data.childInfo?.multipleBirthOrder || ""}
                    </Text>
                  </View>
                  <View style={styles.bottomGridColumn}>
                    <Text style={styles.bottomGridLabel}>Birth Order:</Text>
                    <Text style={styles.bottomGridValue}>
                      {data.childInfo?.birthOrder || ""}
                    </Text>
                  </View>
                  <View style={styles.bottomGridColumn}>
                    <Text style={styles.bottomGridLabel}>Weight at Birth:</Text>
                    <Text style={styles.bottomGridValue}>
                      {data.childInfo?.weightAtBirth || ""}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Mother's Information */}
          <View>
            <View style={styles.gridContainer}>
              <View style={styles.motherLabelGrid}>
                <Text style={styles.verticalText}>
                  M{"\n"}O{"\n"}T{"\n"}H{"\n"}E{"\n"}R
                </Text>
              </View>
              <View style={styles.leftGrid}>
                {/* Name Field */}
                <View style={styles.nameFieldContainer}>
                  <Text style={styles.nameLabel}>Name:</Text>
                  <View style={styles.nameInputContainer}>
                    <Text style={styles.nameInput}>(First Name)</Text>
                    <Text style={styles.nameInput}>(Middle Name)</Text>
                    <Text style={styles.nameInput}>(Last Name)</Text>
                  </View>
                  <View style={styles.nameInputContainer}>
                    <Text style={styles.nameInput}>
                      {data.motherInfo?.firstName || ""}
                    </Text>
                    <Text style={styles.nameInput}>
                      {data.motherInfo?.middleName || ""}
                    </Text>
                    <Text style={styles.nameInput}>
                      {data.motherInfo?.lastName || ""}
                    </Text>
                  </View>
                </View>

                {/* Citizenship and Religion Field */}
                <View
                  style={{
                    flexDirection: "row",
                    borderBottom: "1px solid #000",
                  }}
                >
                  <View style={{ width: "50%", borderRight: "1px solid #000" }}>
                    <View
                      style={[
                        styles.fieldContainer,
                        { flexDirection: "column", padding: 1 },
                      ]}
                    >
                      <Text style={styles.label}>Citizenship:</Text>
                      <Text style={styles.value}>
                        {data.motherInfo?.citizenship || ""}
                      </Text>
                    </View>
                  </View>
                  <View style={{ width: "50%" }}>
                    <View
                      style={[
                        styles.fieldContainer,
                        { flexDirection: "column", padding: 1 },
                      ]}
                    >
                      <Text style={styles.label}>Religion:</Text>
                      <Text style={styles.value}>
                        {data.motherInfo?.religion || ""}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Additional Fields */}
                <View
                  style={{
                    flexDirection: "row",
                    borderBottom: "1px solid #000",
                  }}
                >
                  <View style={{ width: "25%", borderRight: "1px solid #000" }}>
                    <View
                      style={[
                        styles.fieldContainer,
                        { flexDirection: "column", padding: 7.3 },
                      ]}
                    >
                      <Text style={styles.label}>
                        Total Children Born Alive:
                      </Text>
                      <Text style={styles.value}>
                        {data.motherInfo?.totalChildrenBornAlive || ""}
                      </Text>
                    </View>
                  </View>
                  <View style={{ width: "25%", borderRight: "1px solid #000" }}>
                    <View
                      style={[
                        styles.fieldContainer,
                        { flexDirection: "column", padding: 7.3 },
                      ]}
                    >
                      <Text style={styles.label}>Children Now Dead:</Text>
                      <Text style={styles.value}>
                        {data.motherInfo?.childrenNowDead || ""}
                      </Text>
                    </View>
                  </View>
                  <View style={{ width: "25%", borderRight: "1px solid #000" }}>
                    <View
                      style={[
                        styles.fieldContainer,
                        { flexDirection: "column", padding: 7.3 },
                      ]}
                    >
                      <Text style={styles.label}>Occupation:</Text>
                      <Text style={styles.value}>
                        {data.motherInfo?.occupation || ""}
                      </Text>
                    </View>
                  </View>
                  <View style={{ width: "25%" }}>
                    <View
                      style={[
                        styles.fieldContainer,
                        { flexDirection: "column", padding: 3 },
                      ]}
                    >
                      <Text style={styles.label}>
                        Age at time of this birth(completed years):
                      </Text>
                      <Text style={styles.value}>
                        {data.motherInfo?.age || ""}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Residence Grid */}
                <View
                  style={{
                    flexDirection: "row",
                    borderBottom: "1px solid #000",
                  }}
                >
                  <View style={{ width: "40%", borderRight: "1px solid #000" }}>
                    <View
                      style={[
                        styles.fieldContainer,
                        { flexDirection: "column", padding: 1 },
                      ]}
                    >
                      <Text style={styles.label}>Residence:</Text>
                      <Text style={styles.value}>
                        {data.motherInfo?.residence?.address || ""}
                      </Text>
                    </View>
                  </View>
                  <View style={{ width: "20%", borderRight: "1px solid #000" }}>
                    <View
                      style={[
                        styles.fieldContainer,
                        { flexDirection: "column", padding: 1 },
                      ]}
                    >
                      <Text style={styles.label}>City/Municipality:</Text>
                      <Text style={styles.value}>
                        {data.motherInfo?.residence?.cityMunicipality || ""}
                      </Text>
                    </View>
                  </View>
                  <View style={{ width: "20%", borderRight: "1px solid #000" }}>
                    <View
                      style={[
                        styles.fieldContainer,
                        { flexDirection: "column", padding: 1 },
                      ]}
                    >
                      <Text style={styles.label}>Province:</Text>
                      <Text style={styles.value}>
                        {data.motherInfo?.residence?.province || ""}
                      </Text>
                    </View>
                  </View>
                  <View style={{ width: "20%" }}>
                    <View
                      style={[
                        styles.fieldContainer,
                        { flexDirection: "column", padding: 1 },
                      ]}
                    >
                      <Text style={styles.label}>Country:</Text>
                      <Text style={styles.value}>
                        {data.motherInfo?.residence?.country || ""}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Father's Information */}
          <View>
            <View style={styles.gridContainer}>
              <View style={styles.fatherLabelGrid}>
                <Text style={styles.verticalText}>
                  F{"\n"}A{"\n"}T{"\n"}H{"\n"}E{"\n"}R
                </Text>
              </View>
              <View style={styles.leftGrid}>
                {/* Name Field */}
                <View style={styles.nameFieldContainer}>
                  <Text style={styles.nameLabel}>Name:</Text>
                  <View style={styles.nameInputContainer}>
                    <Text style={styles.nameInput}>(First Name)</Text>
                    <Text style={styles.nameInput}>(Middle Name)</Text>
                    <Text style={styles.nameInput}>(Last Name)</Text>
                  </View>
                  <View style={styles.nameInputContainer}>
                    <Text style={styles.nameInput}>
                      {data.fatherInfo?.firstName || ""}
                    </Text>
                    <Text style={styles.nameInput}>
                      {data.fatherInfo?.middleName || ""}
                    </Text>
                    <Text style={styles.nameInput}>
                      {data.fatherInfo?.lastName || ""}
                    </Text>
                  </View>
                </View>

                {/* Citizenship, Religion, Occupation, and Age Field */}
                <View
                  style={{
                    flexDirection: "row",
                    borderBottom: "1px solid #000",
                  }}
                >
                  <View style={{ width: "25%", borderRight: "1px solid #000" }}>
                    <View
                      style={[
                        styles.fieldContainer,
                        { flexDirection: "column", padding: 7 },
                      ]}
                    >
                      <Text style={styles.label}>Citizenship:</Text>
                      <Text style={styles.value}>
                        {data.fatherInfo?.citizenship || ""}
                      </Text>
                    </View>
                  </View>
                  <View style={{ width: "25%", borderRight: "1px solid #000" }}>
                    <View
                      style={[
                        styles.fieldContainer,
                        { flexDirection: "column", padding: 7 },
                      ]}
                    >
                      <Text style={styles.label}>Religion:</Text>
                      <Text style={styles.value}>
                        {data.fatherInfo?.religion || ""}
                      </Text>
                    </View>
                  </View>
                  <View style={{ width: "25%", borderRight: "1px solid #000" }}>
                    <View
                      style={[
                        styles.fieldContainer,
                        { flexDirection: "column", padding: 7 },
                      ]}
                    >
                      <Text style={styles.label}>Occupation:</Text>
                      <Text style={styles.value}>
                        {data.fatherInfo?.occupation || ""}
                      </Text>
                    </View>
                  </View>
                  <View style={{ width: "25%" }}>
                    <View
                      style={[
                        styles.fieldContainer,
                        { flexDirection: "column", padding: 2.5 },
                      ]}
                    >
                      <Text style={styles.label}>
                        Age at time of this birth(completed years):
                      </Text>
                      <Text style={styles.value}>
                        {data.fatherInfo?.age || ""}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Residence Grid */}
                <View
                  style={{
                    flexDirection: "row",
                    borderBottom: "1px solid #000",
                  }}
                >
                  <View style={{ width: "40%", borderRight: "1px solid #000" }}>
                    <View
                      style={[
                        styles.fieldContainer,
                        { flexDirection: "column", padding: 1 },
                      ]}
                    >
                      <Text style={styles.label}>Residence:</Text>
                      <Text style={styles.value}>
                        {data.fatherInfo?.residence?.address || ""}
                      </Text>
                    </View>
                  </View>
                  <View style={{ width: "20%", borderRight: "1px solid #000" }}>
                    <View
                      style={[
                        styles.fieldContainer,
                        { flexDirection: "column", padding: 1 },
                      ]}
                    >
                      <Text style={styles.label}>City/Municipality:</Text>
                      <Text style={styles.value}>
                        {data.fatherInfo?.residence?.cityMunicipality || ""}
                      </Text>
                    </View>
                  </View>
                  <View style={{ width: "20%", borderRight: "1px solid #000" }}>
                    <View
                      style={[
                        styles.fieldContainer,
                        { flexDirection: "column", padding: 1 },
                      ]}
                    >
                      <Text style={styles.label}>Province:</Text>
                      <Text style={styles.value}>
                        {data.fatherInfo?.residence?.province || ""}
                      </Text>
                    </View>
                  </View>
                  <View style={{ width: "20%" }}>
                    <View
                      style={[
                        styles.fieldContainer,
                        { flexDirection: "column", padding: 1 },
                      ]}
                    >
                      <Text style={styles.label}>Country:</Text>
                      <Text style={styles.value}>
                        {data.fatherInfo?.residence?.country || ""}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.sectionGrid}>
            <Text style={styles.title}>Marriage of Parents</Text>
            <View style={styles.marriageGridContainer}>
              {/* Left Grid: Date */}
              <View style={styles.marriageLeftGrid}>
                <Text style={styles.label}>Date:</Text>
                <View style={styles.dateInputContainer}>
                  <Text style={styles.dateInput}>(Month)</Text>
                  <Text style={styles.dateInput}>(Day)</Text>
                  <Text style={styles.dateInput}>(Year)</Text>
                </View>
                <View style={styles.dateInputContainer}>
                  <Text style={styles.dateInput}>
                    {data.parentMarriage?.date
                      ? new Date(data.parentMarriage.date).getMonth() + 1 // Months are 0-indexed, so add 1
                      : ""}
                  </Text>
                  <Text style={styles.dateInput}>
                    {data.parentMarriage?.date
                      ? new Date(data.parentMarriage.date).getDate()
                      : ""}
                  </Text>
                  <Text style={styles.dateInput}>
                    {data.parentMarriage?.date
                      ? new Date(data.parentMarriage.date).getFullYear()
                      : ""}
                  </Text>
                </View>
              </View>

              {/* Right Grid: Place */}
              <View style={styles.marriageRightGrid}>
                <Text style={styles.label}>Place:</Text>
                <View style={styles.dateInputContainer}>
                  <Text style={styles.dateInput}>(City/Municipality)</Text>
                  <Text style={styles.dateInput}>(Province)</Text>
                  <Text style={styles.dateInput}>(Country)</Text>
                </View>
                <View style={styles.dateInputContainer}>
                  <Text style={styles.dateInput}>
                    {data.parentMarriage?.place?.cityMunicipality || ""}
                  </Text>
                  <Text style={styles.dateInput}>
                    {data.parentMarriage?.place?.province || ""}
                  </Text>
                  <Text style={styles.dateInput}>
                    {data.parentMarriage?.place?.country || ""}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Attendant */}
          <View style={styles.sectionGrid}>
            <Text style={styles.label}>Attendant:</Text>
            <Text style={styles.value}>
              {data.attendant?.type || ""} -{" "}
              {data.attendant?.certification?.name || ""}
            </Text>
          </View>

          {/* Certification of Attendant at Birth */}
          <View style={[styles.sectionGrid, { padding: 3 }]}>
            <Text style={[styles.label, { fontSize: 10 }]}>
              CERTIFICATION OF ATTENDANT AT BIRTH
            </Text>
            <Text style={[styles.value, { fontSize: 10 }]}>
              I hereby certify that I attended the birth of the child who was
              born alive at{" "}
              <Text style={{ textDecoration: "underline" }}>
                {data.attendant?.certification?.time
                  ? new Intl.DateTimeFormat("en-US", {
                    hour: "numeric", // Use numeric hour (e.g., 1, 2, 3)
                    minute: "2-digit", // Use 2-digit minutes (e.g., 05, 30)
                    hour12: true, // Use 12-hour format (e.g., 2:30 PM)
                  }).format(new Date(data.attendant.certification.time))
                  : ""}
              </Text>
              on the date of birth specified above.
            </Text>
            <View style={{ flexDirection: "row", marginTop: 3 }}>
              <View style={{ width: "50%" }}>
                <Text style={[styles.label, { fontSize: 10 }]}>Signature:</Text>
                <Text style={[styles.value, { fontSize: 10 }]}>
                  <Text style={{ textDecoration: "underline" }}>
                    {data.attendant?.certification?.signature || ""}
                  </Text>
                </Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text style={[styles.label, { fontSize: 10 }]}>Address:</Text>
                <Text style={[styles.value, { fontSize: 10 }]}>
                  {data.attendant?.certification?.address || ""}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", marginTop: 3 }}>
              <View style={{ width: "50%" }}>
                <Text style={[styles.label, { fontSize: 10 }]}>
                  Name in Print:
                </Text>
                <Text style={[styles.value, { fontSize: 10 }]}>
                  {data.attendant?.certification?.name || ""}
                </Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text style={[styles.label, { fontSize: 10 }]}>
                  Title or Position:
                </Text>
                <Text style={[styles.value, { fontSize: 10 }]}>
                  {data.attendant?.certification?.title || ""}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", marginTop: 3 }}>
              <View style={{ width: "50%" }}>
                <Text style={[styles.label, { fontSize: 10 }]}>Date:</Text>
                <Text style={[styles.value, { fontSize: 10 }]}>
                  {data.attendant?.certification?.date
                    ? formatDateTime(data.attendant.certification.date, {
                      monthFormat: "numeric",
                      dayFormat: "numeric",
                      yearFormat: "numeric",
                    })
                    : ""}
                </Text>
              </View>
            </View>
          </View>

          {/* Certification Informant and Prepared By */}
          <View style={{ flexDirection: "row" }}>
            {/* Certification Informant */}
            <View
              style={[
                styles.sectionGrid,
                { width: "50%", borderRight: "1px solid #000", padding: 3 },
              ]}
            >
              <Text style={[styles.label, { fontSize: 10 }]}>
                CERTIFICATION INFORMAT
              </Text>
              <Text style={[styles.value, { fontSize: 10 }]}>
                I hereby certify that all information supplied are true and
                correct to my own knowledge and belief.
              </Text>
              <View style={{ flexDirection: "row", marginTop: 3 }}>
                <View style={{ width: "50%" }}>
                  <Text style={[styles.label, { fontSize: 10 }]}>
                    Signature:
                  </Text>
                  <Text style={[styles.value, { fontSize: 10 }]}>
                    <Text style={{ textDecoration: "underline" }}>
                      {data.informant?.signature || ""}
                    </Text>
                  </Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={[styles.label, { fontSize: 10 }]}>
                    Name in Print:
                  </Text>
                  <Text style={[styles.value, { fontSize: 10 }]}>
                    {data.informant?.name || ""}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", marginTop: 3 }}>
                <View style={{ width: "50%" }}>
                  <Text style={[styles.label, { fontSize: 10 }]}>
                    Relationship to the Child:
                  </Text>
                  <Text style={[styles.value, { fontSize: 10 }]}>
                    {data.informant?.relationship || ""}
                  </Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={[styles.label, { fontSize: 10 }]}>Address:</Text>
                  <Text style={[styles.value, { fontSize: 10 }]}>
                    {data.informant?.address || ""}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", marginTop: 3 }}>
                <View style={{ width: "50%" }}>
                  <Text style={[styles.label, { fontSize: 10 }]}>Date:</Text>
                  <Text style={[styles.value, { fontSize: 10 }]}>
                    {data.informant?.date
                      ? formatDateTime(data.informant.date, {
                        monthFormat: "numeric",
                      })
                      : ""}
                  </Text>
                </View>
              </View>
            </View>
            {/* Prepared By */}
            <View style={[styles.sectionGrid, { width: "50%", padding: 3 }]}>
              <Text style={[styles.label, { fontSize: 10 }]}>PREPARED BY</Text>
              <View style={{ flexDirection: "row", marginTop: 3 }}>
                <View style={{ width: "50%" }}>
                  <Text style={[styles.label, { fontSize: 10 }]}>
                    Signature:
                  </Text>
                  <Text style={[styles.value, { fontSize: 10 }]}>
                    <Text style={{ textDecoration: "underline" }}>
                      {data.preparedBy?.signature || ""}
                    </Text>
                  </Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={[styles.label, { fontSize: 10 }]}>
                    Name in Print:
                  </Text>
                  <Text style={[styles.value, { fontSize: 10 }]}>
                    {data.preparedBy?.name || ""}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", marginTop: 3 }}>
                <View style={{ width: "50%" }}>
                  <Text style={[styles.label, { fontSize: 10 }]}>
                    Title or Position:
                  </Text>
                  <Text style={[styles.value, { fontSize: 10 }]}>
                    {data.preparedBy?.title || ""}
                  </Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={[styles.label, { fontSize: 10 }]}>Date:</Text>
                  <Text style={[styles.value, { fontSize: 10 }]}>
                    {data.preparedBy?.date
                      ? formatDateTime(data.preparedBy.date, {
                        monthFormat: "numeric",
                      })
                      : ""}
                  </Text>
                </View>
              </View>
            </View>
            10{" "}
          </View>

          {/* Received By and Registered At Grids */}
          <View style={{ flexDirection: "row" }}>
            {/* Received By */}
            <View style={[styles.sectionGrid, styles.receivedByGrid]}>
              <Text style={[styles.label, { fontSize: 10 }]}>RECEIVED BY</Text>
              <View style={{ flexDirection: "row", marginTop: 3 }}>
                <View style={{ width: "50%" }}>
                  <Text style={[styles.label, { fontSize: 10 }]}>
                    Signature:
                  </Text>
                  <Text style={[styles.value, { fontSize: 10 }]}>
                    <Text style={{ textDecoration: "underline" }}>
                      {data.receivedBy?.signature || ""}
                    </Text>
                  </Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={[styles.label, { fontSize: 10 }]}>
                    Name in Print:
                  </Text>
                  <Text style={[styles.value, { fontSize: 10 }]}>
                    {data.receivedBy?.name || ""}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", marginTop: 3 }}>
                <View style={{ width: "50%" }}>
                  <Text style={[styles.label, { fontSize: 10 }]}>
                    Title or Position:
                  </Text>
                  <Text style={[styles.value, { fontSize: 10 }]}>
                    {data.receivedBy?.title || ""}
                  </Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={[styles.label, { fontSize: 10 }]}>Date:</Text>
                  <Text style={[styles.value, { fontSize: 10 }]}>
                    {data.receivedBy?.date
                      ? formatDateTime(data.receivedBy.date, {
                        monthFormat: "numeric",
                      })
                      : ""}
                  </Text>
                </View>
              </View>
            </View>
            {/* Registered At the Office of the Civil Registrar */}
            <View style={[styles.sectionGrid, styles.registeredAtGrid]}>
              <Text style={[styles.label, { fontSize: 10 }]}>
                REGISTERED AT THE OFFICE OF THE CIVIL REGISTRAR
              </Text>
              <View style={{ flexDirection: "row", marginTop: 3 }}>
                <View style={{ width: "50%" }}>
                  <Text style={[styles.label, { fontSize: 10 }]}>
                    Signature:
                  </Text>
                  <Text style={[styles.value, { fontSize: 10 }]}>
                    <Text style={{ textDecoration: "underline" }}>
                      {data.registeredByOffice?.signature || ""}
                    </Text>
                  </Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={[styles.label, { fontSize: 10 }]}>
                    Name in Print:
                  </Text>
                  <Text style={[styles.value, { fontSize: 10 }]}>
                    {data.registeredByOffice?.name || ""}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", marginTop: 3 }}>
                <View style={{ width: "50%" }}>
                  <Text style={[styles.label, { fontSize: 10 }]}>
                    Title or Position:
                  </Text>
                  <Text style={[styles.value, { fontSize: 10 }]}>
                    {data.registeredByOffice?.title || ""}
                  </Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={[styles.label, { fontSize: 10 }]}>Date:</Text>
                  <Text style={[styles.value, { fontSize: 10 }]}>
                    {data.registeredByOffice?.date
                      ? formatDateTime(data.registeredByOffice.date, {
                        monthFormat: "numeric",
                      })
                      : ""}
                  </Text>
                </View>
              </View>
            </View>
            10{" "}
          </View>

          {/* Remarks Grid */}
          <View style={[styles.sectionGrid, styles.remarksGrid]}>
            <Text style={[styles.label, { fontSize: 10 }]}>Remarks:</Text>
            <Text style={[styles.value, { fontSize: 10 }]}>
              {data.remarks || ""}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default BirthCertificatePDF;
