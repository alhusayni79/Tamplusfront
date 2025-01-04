import React from 'react';
import {
  Grid,
  MenuItem,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Box,
  Button,
  IconButton
} from '@mui/material';
import { Description as DescriptionIcon, CloudUpload as CloudUploadIcon, Delete as DeleteIcon } from '@mui/icons-material';
import CustomInput from "../../shared/CustomInput";

const institutionRequirements = {
  "1": { // شركة
    type: "شركة",
    fileFields: [
      {
        name: "commercial_register",
        label: "السجل التجاري",
        stateKey: "companyCommercialReg"
      },
      {
        name: "bank_account_letter",
        label: "خطاب الحساب البنكي",
        stateKey: "companyBankLetter"
      },
      {
        name: "civil_id",
        label: "البطاقة المدنية",
        stateKey: "companyCivilId"
      },
      {
        name: "article_of_association",
        label: "عقد التأسيس",
        stateKey: "companyFoundingContract"
      },
      {
        name: "civil_ids_of_all_owners",
        label: "البطاقات المدنية لجميع المالكين",
        stateKey: "companyOwnersCivilIds"
      },
      {
        name: "manager_civil_id",
        label: "البطاقة المدنية للمدير",
        stateKey: "companyManagerCivilId"
      },
      {
        name: "commercial_license",
        label: "الرخصة التجارية",
        stateKey: "companyLicense"
      },
      {
        name: "signature_authorization",
        label: "تفويض التوقيع",
        stateKey: "companySignatureAuth"
      }
    ]
  },
  "2": { // مؤسسة
    type: "مؤسسة",
    fileFields: [
      {
        name: "commercial_register",
        label: "السجل التجاري",
        stateKey: "orgCommercialReg"
      },
      {
        name: "bank_account_letter",
        label: "خطاب الحساب البنكي",
        stateKey: "orgBankLetter"
      },
      {
        name: "civil_id",
        label: "البطاقة المدنية",
        stateKey: "orgCivilId"
      },
      {
        name: "commercial_license",
        label: "الرخصة التجارية",
        stateKey: "orgLicense"
      },
      {
        name: "manager_civil_id",
        label: "البطاقة المدنية للمدير",
        stateKey: "orgManagerCivilId"
      },
      {
        name: "signature_authorization",
        label: "تفويض التوقيع",
        stateKey: "orgSignatureAuth"
      }
    ]
  },
  "3": { // عمل حر
    type: "عمل حر",
    fileFields: [
      {
        name: "civil_id",
        label: "البطاقة المدنية",
        stateKey: "freelancerCivilId"
      },
      {
        name: "articles_association",
        label: "عقد التأسيس",
        stateKey: "freelancerArticles"
      },
      {
        name: "bank_account_letter",
        label: "خطاب الحساب البنكي",
        stateKey: "freelancerBankLetter"
      },
      {
        name: "commercial_license",
        label: "الرخصة التجارية",
        stateKey: "freelancerLicense"
      }
    ]
  }
};

const FileUploadField = ({ label, fieldName, attachment, handleFileChange, handleRemoveFile }) => (
  <Box sx={{ mb: 2, textAlign: "right" }}>
    <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
      {label}:
    </Typography>

    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Button
        component="label"
        variant="outlined"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1
        }}
      >
        <CloudUploadIcon />
        اختر ملف
        <input
          type="file"
          hidden
          onChange={(e) => handleFileChange(e, fieldName)}
        />
      </Button>

      {attachment && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}>
          <DescriptionIcon color="action" />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {attachment.name}
          </Typography>
          <IconButton
            color="error"
            onClick={() => handleRemoveFile(fieldName)}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  </Box>
);

const InstitutionTypeSection = ({ values, handleChange, handleBlur, touched, errors, attachments, handleFileChange, handleRemoveFile }) => {
  return (
    <>
      {/* <Grid item xs={12} sm={6}>
        <CustomInput
          label="نوع المؤسسة"
          placeholder="اختر نوع المؤسسة"
          name="institution_type"
          value={values.institution_type}
          onChange={handleChange}
          onBlur={handleBlur}
          select
          options={[
            { value: "1", label: "شركة" },
            { value: "2", label: "مؤسسة" },
            { value: "3", label: "عمل حر" },
          ]}
          error={touched.institution_type && Boolean(errors.institution_type)}
          helperText={touched.institution_type && errors.institution_type}
          sx={{ direction: "rtl", textAlign: "right" }}
        />
      </Grid> */}

      {values.institution_type && (
        <Grid item xs={12}>
          <Box
            sx={{
              border: "2px dashed #ccc",
              padding: 3,
              borderRadius: 2,
              mt: 2
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'right' }}>
              المتطلبات والمرفقات:
            </Typography>

            <Box sx={{ mt: 3 }}>
              {institutionRequirements[values.institution_type].fileFields.map((field, index) => (
                <FileUploadField
                  key={field.name}
                  label={field.label}
                  fieldName={field.stateKey}
                  attachment={attachments[field.stateKey]}
                  handleFileChange={handleFileChange}
                  handleRemoveFile={handleRemoveFile}
                />
              ))}
            </Box>
          </Box>
        </Grid>
      )}
    </>
  );
};

export default InstitutionTypeSection;