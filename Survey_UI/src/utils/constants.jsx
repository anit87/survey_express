export const generateTrueFalseOptions = (translate) => [
    { label: translate("PleaseSelect"), value: "" },
    {
        label: translate("Yes"),
        value: 1
    },
    {
        label: translate("No"),
        value: 0
    }
]
export const generateVotedLastElectionOptions = (translate) => [
    { label: translate("PleaseSelect"), value: "" },
    {
        label: translate("Yes"),
        value: 1
    },
    {
        label: translate("No"),
        value: 0
    },
    {
        label: translate("PreferNotToSay"),
        value: 2
    }
]

export const occupationOptios = [
    { label: "Please Select", value: "" },
    { label: "Self-employed", value: 1 },
    { label: "Full-time", value: 2 },
    { label: "Part-time/freelancer", value: 3 },
    { label: "Home maker", value: 4 }
]

export const generatereligionOptions = (t) => [
    { label: t("PleaseSelect"), value: "" },
    { label: t("Religion.Hindu"), value: 1 },
    { label: t("Religion.Muslim"), value: 2 },
    { label: t("Religion.Christianity"), value: 3 },
    { label: t("Religion.Sikh"), value: 4 },
    { label: t("Religion.Jain"), value: 5 },
    { label: t("Religion.Other"), value: 6 }
]

export const generateageOptions = (t) => [
    {
        label: t("PleaseSelect"),
        value: ""
    },
    {
        label: t("18OrBelow"),
        value: 1
    },
    {
        label: t("19To24"),
        value: 2
    },
    {
        label: t("24To35"),
        value: 3
    },
    {
        label: t("35To45"),
        value: 4
    },
    {
        label: t("above45"),
        value: 5
    }
]

export const generateIncomeOptions = (translate) => [
    { label: translate('PleaseSelect'), value: '' },
    { label: translate('IncomeOptions.below20000'), value: 1 },
    { label: translate('IncomeOptions.20000to50000'), value: 2 },
    { label: translate('IncomeOptions.50000to100000'), value: 3 },
    { label: translate('IncomeOptions.100000to300000'), value: 4 },
    { label: translate('IncomeOptions.above300000'), value: 5 },
];

export const maritalOptions = [
    { label: "Please Select", value: "" },
    { label: "Single", value: 1 },
    { label: "Married", value: 2 }
]

export const generateEducationalOptions = (t) => [
    { label: t("PleaseSelect"), value: "" },
    {
        label: t("EducationDetails.Illiterate"),
        value: 1
    },
    {
        label: t("EducationDetails.LiterateNoFormal"),
        value: 2
    },
    {
        label: t("EducationDetails.School59"),
        value: 3
    },
    {
        label: t("EducationDetails.SSC/HSC"),
        value: 4
    },
    {
        label: t("EducationDetails.Graduate"),
        value: 5
    },
    {
        label: t("EducationDetails.Postgraduate"),
        value: 6
    },
    {
        label: t("EducationDetails.Professional"),
        value: 7
    }
]

export const generategovernmentSchemesOptions = (t) => [
    {
        label: t("GruhaJyothiScheme"),
        value: 1
    },
    {
        label: t("GruhaLakshmiScheme"),
        value: 2
    },
    {
        label: t("YuvaNidhiScheme"),
        value: 3
    },
    {
        label: t("AnnaBhagyaScheme"),
        value: 4
    },
    {
        label: t("ShaktiScheme"),
        value: 5
    },
    {
        label: t("Others"),
        value: 6
    },
    {
        label: t("None Of Above"),
        value: -1
    }
]

export const generatecategoryOptions = (t) => [
    { label: t("PleaseSelect"), value: "" },
    {
        label: t("BPL"),
        value: 1
    },
    {
        label: t("APL"),
        value: 2
    },
    {
        label: t("N/A"),
        value: 3
    }
]

export const generateCasteOptions = (t) => [
    { label: t("PleaseSelect"), value: "" },
    { label: t("Caste.Vokkaliga/Gowda"), value: 1 },
    { label: t("Caste.Lingayat"), value: 2 },
    { label: t("Caste.Brahmin"), value: 3 },
    { label: t("Caste.Kuruba"), value: 4 },
    { label: t("Caste.SC"), value: 5 },
    { label: t("Caste.ST"), value: 6 },
    { label: t("Caste.OBC"), value: 7 },
    { label: t("Caste.Others"), value: 8 },
    { label: t("PreferNotToSay"), value: 9 }
]

export const generateConstituencyOptions = (t) => [
    { label: t("Govindraj Nagar"), value: 1 },
    { label: t("Vijay Nagar"), value: 2 },
    { label: t("PreferNotToSay"), value: 3 },
]

export const generateEstablishmentOptions = (t) => [
    { label: t("PleaseSelect"), value: "" },
    { label: t("Establishment.NGO"), value: 1 },
    { label: t("Establishment.EducationalInstitutions"), value: 2 },
    { label: t("Establishment.Medical"), value: 3 },
    { label: t("Establishment.GeneralStore/supermarket"), value: 4 },
    { label: t("Establishment.MeatShop"), value: 5 },
    { label: t("Establishment.Spa/Hair/Skin"), value: 6 },
    { label: t("Establishment.SmallShops"), value: 7 },
]