"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export interface CountryOption {
  flag: string;
  name: string;
  code: string;
  id: string;
}

export const COUNTRIES: CountryOption[] = [
  { flag: '🇦🇫', name: 'Afghanistan', code: '+93', id: 'AF' },
  { flag: '🇦🇱', name: 'Albania', code: '+355', id: 'AL' },
  { flag: '🇩🇿', name: 'Algeria', code: '+213', id: 'DZ' },
  { flag: '🇦🇸', name: 'American Samoa', code: '+1684', id: 'AS' },
  { flag: '🇦🇩', name: 'Andorra', code: '+376', id: 'AD' },
  { flag: '🇦🇴', name: 'Angola', code: '+244', id: 'AO' },
  { flag: '🇦🇮', name: 'Anguilla', code: '+1264', id: 'AI' },
  { flag: '🇦🇬', name: 'Antigua and Barbuda', code: '+1268', id: 'AG' },
  { flag: '🇦🇷', name: 'Argentina', code: '+54', id: 'AR' },
  { flag: '🇦🇲', name: 'Armenia', code: '+374', id: 'AM' },
  { flag: '🇦🇼', name: 'Aruba', code: '+297', id: 'AW' },
  { flag: '🇦🇺', name: 'Australia', code: '+61', id: 'AU' },
  { flag: '🇦🇹', name: 'Austria', code: '+43', id: 'AT' },
  { flag: '🇦🇿', name: 'Azerbaijan', code: '+994', id: 'AZ' },
  { flag: '🇧🇸', name: 'Bahamas', code: '+1242', id: 'BS' },
  { flag: '🇧🇭', name: 'Bahrain', code: '+973', id: 'BH' },
  { flag: '🇧🇩', name: 'Bangladesh', code: '+880', id: 'BD' },
  { flag: '🇧🇧', name: 'Barbados', code: '+1246', id: 'BB' },
  { flag: '🇧🇾', name: 'Belarus', code: '+375', id: 'BY' },
  { flag: '🇧🇪', name: 'Belgium', code: '+32', id: 'BE' },
  { flag: '🇧🇿', name: 'Belize', code: '+501', id: 'BZ' },
  { flag: '🇧🇯', name: 'Benin', code: '+229', id: 'BJ' },
  { flag: '🇧🇲', name: 'Bermuda', code: '+1441', id: 'BM' },
  { flag: '🇧🇹', name: 'Bhutan', code: '+975', id: 'BT' },
  { flag: '🇧🇴', name: 'Bolivia', code: '+591', id: 'BO' },
  { flag: '🇧🇦', name: 'Bosnia and Herzegovina', code: '+387', id: 'BA' },
  { flag: '🇧🇼', name: 'Botswana', code: '+267', id: 'BW' },
  { flag: '🇧🇷', name: 'Brazil', code: '+55', id: 'BR' },
  { flag: '🇮🇴', name: 'British Indian Ocean Territory', code: '+246', id: 'IO' },
  { flag: '🇻🇬', name: 'British Virgin Islands', code: '+1284', id: 'VG' },
  { flag: '🇧🇳', name: 'Brunei', code: '+673', id: 'BN' },
  { flag: '🇧🇬', name: 'Bulgaria', code: '+359', id: 'BG' },
  { flag: '🇧🇫', name: 'Burkina Faso', code: '+226', id: 'BF' },
  { flag: '🇧🇮', name: 'Burundi', code: '+257', id: 'BI' },
  { flag: '🇰🇭', name: 'Cambodia', code: '+855', id: 'KH' },
  { flag: '🇨🇲', name: 'Cameroon', code: '+237', id: 'CM' },
  { flag: '🇨🇦', name: 'Canada', code: '+1', id: 'CA' },
  { flag: '🇨🇻', name: 'Cape Verde', code: '+238', id: 'CV' },
  { flag: '🇰🇾', name: 'Cayman Islands', code: '+1345', id: 'KY' },
  { flag: '🇨🇫', name: 'Central African Republic', code: '+236', id: 'CF' },
  { flag: '🇹🇩', name: 'Chad', code: '+235', id: 'TD' },
  { flag: '🇨🇱', name: 'Chile', code: '+56', id: 'CL' },
  { flag: '🇨🇳', name: 'China', code: '+86', id: 'CN' },
  { flag: '🇨🇴', name: 'Colombia', code: '+57', id: 'CO' },
  { flag: '🇰🇲', name: 'Comoros', code: '+269', id: 'KM' },
  { flag: '🇨🇬', name: 'Congo', code: '+242', id: 'CG' },
  { flag: '🇨🇰', name: 'Cook Islands', code: '+682', id: 'CK' },
  { flag: '🇨🇷', name: 'Costa Rica', code: '+506', id: 'CR' },
  { flag: '🇭🇷', name: 'Croatia', code: '+385', id: 'HR' },
  { flag: '🇨🇺', name: 'Cuba', code: '+53', id: 'CU' },
  { flag: '🇨🇼', name: 'Curaçao', code: '+599', id: 'CW' },
  { flag: '🇨🇾', name: 'Cyprus', code: '+357', id: 'CY' },
  { flag: '🇨🇿', name: 'Czechia', code: '+420', id: 'CZ' },
  { flag: '🇨🇩', name: 'DR Congo', code: '+243', id: 'CD' },
  { flag: '🇩🇰', name: 'Denmark', code: '+45', id: 'DK' },
  { flag: '🇩🇯', name: 'Djibouti', code: '+253', id: 'DJ' },
  { flag: '🇩🇲', name: 'Dominica', code: '+1767', id: 'DM' },
  { flag: '🇩🇴', name: 'Dominican Republic', code: '+1809', id: 'DO' },
  { flag: '🇪🇨', name: 'Ecuador', code: '+593', id: 'EC' },
  { flag: '🇪🇬', name: 'Egypt', code: '+20', id: 'EG' },
  { flag: '🇸🇻', name: 'El Salvador', code: '+503', id: 'SV' },
  { flag: '🇬🇶', name: 'Equatorial Guinea', code: '+240', id: 'GQ' },
  { flag: '🇪🇷', name: 'Eritrea', code: '+291', id: 'ER' },
  { flag: '🇪🇪', name: 'Estonia', code: '+372', id: 'EE' },
  { flag: '🇸🇿', name: 'Eswatini', code: '+268', id: 'SZ' },
  { flag: '🇪🇹', name: 'Ethiopia', code: '+251', id: 'ET' },
  { flag: '🇫🇰', name: 'Falkland Islands', code: '+500', id: 'FK' },
  { flag: '🇫🇴', name: 'Faroe Islands', code: '+298', id: 'FO' },
  { flag: '🇫🇯', name: 'Fiji', code: '+679', id: 'FJ' },
  { flag: '🇫🇮', name: 'Finland', code: '+358', id: 'FI' },
  { flag: '🇫🇷', name: 'France', code: '+33', id: 'FR' },
  { flag: '🇬🇫', name: 'French Guiana', code: '+594', id: 'GF' },
  { flag: '🇵🇫', name: 'French Polynesia', code: '+689', id: 'PF' },
  { flag: '🇬🇦', name: 'Gabon', code: '+241', id: 'GA' },
  { flag: '🇬🇲', name: 'Gambia', code: '+220', id: 'GM' },
  { flag: '🇬🇪', name: 'Georgia', code: '+995', id: 'GE' },
  { flag: '🇩🇪', name: 'Germany', code: '+49', id: 'DE' },
  { flag: '🇬🇭', name: 'Ghana', code: '+233', id: 'GH' },
  { flag: '🇬🇮', name: 'Gibraltar', code: '+350', id: 'GI' },
  { flag: '🇬🇷', name: 'Greece', code: '+30', id: 'GR' },
  { flag: '🇬🇱', name: 'Greenland', code: '+299', id: 'GL' },
  { flag: '🇬🇩', name: 'Grenada', code: '+1473', id: 'GD' },
  { flag: '🇬🇵', name: 'Guadeloupe', code: '+590', id: 'GP' },
  { flag: '🇬🇺', name: 'Guam', code: '+1671', id: 'GU' },
  { flag: '🇬🇹', name: 'Guatemala', code: '+502', id: 'GT' },
  { flag: '🇬🇬', name: 'Guernsey', code: '+44', id: 'GG' },
  { flag: '🇬🇳', name: 'Guinea', code: '+224', id: 'GN' },
  { flag: '🇬🇼', name: 'Guinea-Bissau', code: '+245', id: 'GW' },
  { flag: '🇬🇾', name: 'Guyana', code: '+592', id: 'GY' },
  { flag: '🇭🇹', name: 'Haiti', code: '+509', id: 'HT' },
  { flag: '🇭🇳', name: 'Honduras', code: '+504', id: 'HN' },
  { flag: '🇭🇰', name: 'Hong Kong', code: '+852', id: 'HK' },
  { flag: '🇭🇺', name: 'Hungary', code: '+36', id: 'HU' },
  { flag: '🇮🇸', name: 'Iceland', code: '+354', id: 'IS' },
  { flag: '🇮🇳', name: 'India', code: '+91', id: 'IN' },
  { flag: '🇮🇩', name: 'Indonesia', code: '+62', id: 'ID' },
  { flag: '🇮🇷', name: 'Iran', code: '+98', id: 'IR' },
  { flag: '🇮🇶', name: 'Iraq', code: '+964', id: 'IQ' },
  { flag: '🇮🇪', name: 'Ireland', code: '+353', id: 'IE' },
  { flag: '🇮🇲', name: 'Isle of Man', code: '+44', id: 'IM' },
  { flag: '🇮🇱', name: 'Israel', code: '+972', id: 'IL' },
  { flag: '🇮🇹', name: 'Italy', code: '+39', id: 'IT' },
  { flag: '🇨🇮', name: 'Ivory Coast', code: '+225', id: 'CI' },
  { flag: '🇯🇲', name: 'Jamaica', code: '+1876', id: 'JM' },
  { flag: '🇯🇵', name: 'Japan', code: '+81', id: 'JP' },
  { flag: '🇯🇪', name: 'Jersey', code: '+44', id: 'JE' },
  { flag: '🇯🇴', name: 'Jordan', code: '+962', id: 'JO' },
  { flag: '🇰🇿', name: 'Kazakhstan', code: '+7', id: 'KZ' },
  { flag: '🇰🇪', name: 'Kenya', code: '+254', id: 'KE' },
  { flag: '🇰🇮', name: 'Kiribati', code: '+686', id: 'KI' },
  { flag: '🇽🇰', name: 'Kosovo', code: '+383', id: 'XK' },
  { flag: '🇰🇼', name: 'Kuwait', code: '+965', id: 'KW' },
  { flag: '🇰🇬', name: 'Kyrgyzstan', code: '+996', id: 'KG' },
  { flag: '🇱🇦', name: 'Laos', code: '+856', id: 'LA' },
  { flag: '🇱🇻', name: 'Latvia', code: '+371', id: 'LV' },
  { flag: '🇱🇧', name: 'Lebanon', code: '+961', id: 'LB' },
  { flag: '🇱🇸', name: 'Lesotho', code: '+266', id: 'LS' },
  { flag: '🇱🇷', name: 'Liberia', code: '+231', id: 'LR' },
  { flag: '🇱🇾', name: 'Libya', code: '+218', id: 'LY' },
  { flag: '🇱🇮', name: 'Liechtenstein', code: '+423', id: 'LI' },
  { flag: '🇱🇹', name: 'Lithuania', code: '+370', id: 'LT' },
  { flag: '🇱🇺', name: 'Luxembourg', code: '+352', id: 'LU' },
  { flag: '🇲🇴', name: 'Macau', code: '+853', id: 'MO' },
  { flag: '🇲🇬', name: 'Madagascar', code: '+261', id: 'MG' },
  { flag: '🇲🇼', name: 'Malawi', code: '+265', id: 'MW' },
  { flag: '🇲🇾', name: 'Malaysia', code: '+60', id: 'MY' },
  { flag: '🇲🇻', name: 'Maldives', code: '+960', id: 'MV' },
  { flag: '🇲🇱', name: 'Mali', code: '+223', id: 'ML' },
  { flag: '🇲🇹', name: 'Malta', code: '+356', id: 'MT' },
  { flag: '🇲🇭', name: 'Marshall Islands', code: '+692', id: 'MH' },
  { flag: '🇲🇶', name: 'Martinique', code: '+596', id: 'MQ' },
  { flag: '🇲🇷', name: 'Mauritania', code: '+222', id: 'MR' },
  { flag: '🇲🇺', name: 'Mauritius', code: '+230', id: 'MU' },
  { flag: '🇾🇹', name: 'Mayotte', code: '+262', id: 'YT' },
  { flag: '🇲🇽', name: 'Mexico', code: '+52', id: 'MX' },
  { flag: '🇫🇲', name: 'Micronesia', code: '+691', id: 'FM' },
  { flag: '🇲🇩', name: 'Moldova', code: '+373', id: 'MD' },
  { flag: '🇲🇨', name: 'Monaco', code: '+377', id: 'MC' },
  { flag: '🇲🇳', name: 'Mongolia', code: '+976', id: 'MN' },
  { flag: '🇲🇪', name: 'Montenegro', code: '+382', id: 'ME' },
  { flag: '🇲🇸', name: 'Montserrat', code: '+1664', id: 'MS' },
  { flag: '🇲🇦', name: 'Morocco', code: '+212', id: 'MA' },
  { flag: '🇲🇿', name: 'Mozambique', code: '+258', id: 'MZ' },
  { flag: '🇲🇲', name: 'Myanmar', code: '+95', id: 'MM' },
  { flag: '🇳🇦', name: 'Namibia', code: '+264', id: 'NA' },
  { flag: '🇳🇷', name: 'Nauru', code: '+674', id: 'NR' },
  { flag: '🇳🇵', name: 'Nepal', code: '+977', id: 'NP' },
  { flag: '🇳🇱', name: 'Netherlands', code: '+31', id: 'NL' },
  { flag: '🇳🇨', name: 'New Caledonia', code: '+687', id: 'NC' },
  { flag: '🇳🇿', name: 'New Zealand', code: '+64', id: 'NZ' },
  { flag: '🇳🇮', name: 'Nicaragua', code: '+505', id: 'NI' },
  { flag: '🇳🇪', name: 'Niger', code: '+227', id: 'NE' },
  { flag: '🇳🇬', name: 'Nigeria', code: '+234', id: 'NG' },
  { flag: '🇳🇺', name: 'Niue', code: '+683', id: 'NU' },
  { flag: '🇳🇫', name: 'Norfolk Island', code: '+672', id: 'NF' },
  { flag: '🇰🇵', name: 'North Korea', code: '+850', id: 'KP' },
  { flag: '🇲🇰', name: 'North Macedonia', code: '+389', id: 'MK' },
  { flag: '🇲🇵', name: 'Northern Mariana Islands', code: '+1670', id: 'MP' },
  { flag: '🇳🇴', name: 'Norway', code: '+47', id: 'NO' },
  { flag: '🇴🇲', name: 'Oman', code: '+968', id: 'OM' },
  { flag: '🇵🇰', name: 'Pakistan', code: '+92', id: 'PK' },
  { flag: '🇵🇼', name: 'Palau', code: '+680', id: 'PW' },
  { flag: '🇵🇸', name: 'Palestine', code: '+970', id: 'PS' },
  { flag: '🇵🇦', name: 'Panama', code: '+507', id: 'PA' },
  { flag: '🇵🇬', name: 'Papua New Guinea', code: '+675', id: 'PG' },
  { flag: '🇵🇾', name: 'Paraguay', code: '+595', id: 'PY' },
  { flag: '🇵🇪', name: 'Peru', code: '+51', id: 'PE' },
  { flag: '🇵🇭', name: 'Philippines', code: '+63', id: 'PH' },
  { flag: '🇵🇱', name: 'Poland', code: '+48', id: 'PL' },
  { flag: '🇵🇹', name: 'Portugal', code: '+351', id: 'PT' },
  { flag: '🇵🇷', name: 'Puerto Rico', code: '+1787', id: 'PR' },
  { flag: '🇶🇦', name: 'Qatar', code: '+974', id: 'QA' },
  { flag: '🇷🇴', name: 'Romania', code: '+40', id: 'RO' },
  { flag: '🇷🇺', name: 'Russia', code: '+7', id: 'RU' },
  { flag: '🇷🇼', name: 'Rwanda', code: '+250', id: 'RW' },
  { flag: '🇷🇪', name: 'Réunion', code: '+262', id: 'RE' },
  { flag: '🇧🇱', name: 'Saint Barthélemy', code: '+590', id: 'BL' },
  { flag: '🇸🇭', name: 'Saint Helena', code: '+290', id: 'SH' },
  { flag: '🇰🇳', name: 'Saint Kitts and Nevis', code: '+1869', id: 'KN' },
  { flag: '🇱🇨', name: 'Saint Lucia', code: '+1758', id: 'LC' },
  { flag: '🇲🇫', name: 'Saint Martin', code: '+590', id: 'MF' },
  { flag: '🇵🇲', name: 'Saint Pierre and Miquelon', code: '+508', id: 'PM' },
  { flag: '🇻🇨', name: 'Saint Vincent and the Grenadines', code: '+1784', id: 'VC' },
  { flag: '🇼🇸', name: 'Samoa', code: '+685', id: 'WS' },
  { flag: '🇸🇲', name: 'San Marino', code: '+378', id: 'SM' },
  { flag: '🇸🇹', name: 'São Tomé and Príncipe', code: '+239', id: 'ST' },
  { flag: '🇸🇦', name: 'Saudi Arabia', code: '+966', id: 'SA' },
  { flag: '🇸🇳', name: 'Senegal', code: '+221', id: 'SN' },
  { flag: '🇷🇸', name: 'Serbia', code: '+381', id: 'RS' },
  { flag: '🇸🇨', name: 'Seychelles', code: '+248', id: 'SC' },
  { flag: '🇸🇱', name: 'Sierra Leone', code: '+232', id: 'SL' },
  { flag: '🇸🇬', name: 'Singapore', code: '+65', id: 'SG' },
  { flag: '🇸🇽', name: 'Sint Maarten', code: '+1721', id: 'SX' },
  { flag: '🇸🇰', name: 'Slovakia', code: '+421', id: 'SK' },
  { flag: '🇸🇮', name: 'Slovenia', code: '+386', id: 'SI' },
  { flag: '🇸🇧', name: 'Solomon Islands', code: '+677', id: 'SB' },
  { flag: '🇸🇴', name: 'Somalia', code: '+252', id: 'SO' },
  { flag: '🇿🇦', name: 'South Africa', code: '+27', id: 'ZA' },
  { flag: '🇰🇷', name: 'South Korea', code: '+82', id: 'KR' },
  { flag: '🇸🇸', name: 'South Sudan', code: '+211', id: 'SS' },
  { flag: '🇪🇸', name: 'Spain', code: '+34', id: 'ES' },
  { flag: '🇱🇰', name: 'Sri Lanka', code: '+94', id: 'LK' },
  { flag: '🇸🇩', name: 'Sudan', code: '+249', id: 'SD' },
  { flag: '🇸🇷', name: 'Suriname', code: '+597', id: 'SR' },
  { flag: '🇸🇪', name: 'Sweden', code: '+46', id: 'SE' },
  { flag: '🇨🇭', name: 'Switzerland', code: '+41', id: 'CH' },
  { flag: '🇸🇾', name: 'Syria', code: '+963', id: 'SY' },
  { flag: '🇹🇼', name: 'Taiwan', code: '+886', id: 'TW' },
  { flag: '🇹🇯', name: 'Tajikistan', code: '+992', id: 'TJ' },
  { flag: '🇹🇿', name: 'Tanzania', code: '+255', id: 'TZ' },
  { flag: '🇹🇭', name: 'Thailand', code: '+66', id: 'TH' },
  { flag: '🇹🇱', name: 'Timor-Leste', code: '+670', id: 'TL' },
  { flag: '🇹🇬', name: 'Togo', code: '+228', id: 'TG' },
  { flag: '🇹🇰', name: 'Tokelau', code: '+690', id: 'TK' },
  { flag: '🇹🇴', name: 'Tonga', code: '+676', id: 'TO' },
  { flag: '🇹🇹', name: 'Trinidad and Tobago', code: '+1868', id: 'TT' },
  { flag: '🇹🇳', name: 'Tunisia', code: '+216', id: 'TN' },
  { flag: '🇹🇷', name: 'Türkiye', code: '+90', id: 'TR' },
  { flag: '🇹🇲', name: 'Turkmenistan', code: '+993', id: 'TM' },
  { flag: '🇹🇨', name: 'Turks and Caicos Islands', code: '+1649', id: 'TC' },
  { flag: '🇹🇻', name: 'Tuvalu', code: '+688', id: 'TV' },
  { flag: '🇺🇬', name: 'Uganda', code: '+256', id: 'UG' },
  { flag: '🇺🇦', name: 'Ukraine', code: '+380', id: 'UA' },
  { flag: '🇦🇪', name: 'United Arab Emirates', code: '+971', id: 'AE' },
  { flag: '🇬🇧', name: 'United Kingdom', code: '+44', id: 'GB' },
  { flag: '🇺🇸', name: 'United States', code: '+1', id: 'US' },
  { flag: '🇻🇮', name: 'US Virgin Islands', code: '+1340', id: 'VI' },
  { flag: '🇺🇾', name: 'Uruguay', code: '+598', id: 'UY' },
  { flag: '🇺🇿', name: 'Uzbekistan', code: '+998', id: 'UZ' },
  { flag: '🇻🇺', name: 'Vanuatu', code: '+678', id: 'VU' },
  { flag: '🇻🇦', name: 'Vatican City', code: '+379', id: 'VA' },
  { flag: '🇻🇪', name: 'Venezuela', code: '+58', id: 'VE' },
  { flag: '🇻🇳', name: 'Vietnam', code: '+84', id: 'VN' },
  { flag: '🇼🇫', name: 'Wallis and Futuna', code: '+681', id: 'WF' },
  { flag: '🇪🇭', name: 'Western Sahara', code: '+212', id: 'EH' },
  { flag: '🇾🇪', name: 'Yemen', code: '+967', id: 'YE' },
  { flag: '🇿🇲', name: 'Zambia', code: '+260', id: 'ZM' },
  { flag: '🇿🇼', name: 'Zimbabwe', code: '+263', id: 'ZW' },
  { flag: '🇦🇽', name: 'Åland Islands', code: '+358', id: 'AX' },
];

interface CountryCodeSelectProps {
  selected: string;
  onChange: (code: string) => void;
}

export default function CountryCodeSelect({ selected, onChange }: CountryCodeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const selectedCountry = COUNTRIES.find((c) => c.code === selected) || COUNTRIES.find((c) => c.id === "IN")!;

  const filteredCountries = search.trim()
    ? COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.code.includes(search)
      )
    : COUNTRIES;

  const handleToggle = () => {
    if (!isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setOpenUpward(spaceBelow < 320);
    }
    setIsOpen(!isOpen);
    setSearch("");
  };

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Trap scroll inside the dropdown — prevent page from scrolling
  const handleWheel = useCallback((e: WheelEvent) => {
    const el = dropdownRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    const delta = e.deltaY;
    const atTop = scrollTop <= 0 && delta < 0;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && delta > 0;

    // Only prevent default if not at a boundary, or at a boundary scrolling into it
    if (!atTop && !atBottom) {
      e.stopPropagation();
    }
    // Always prevent page scroll when dropdown is open
    e.preventDefault();
  }, []);

  useEffect(() => {
    const el = dropdownRef.current;
    if (isOpen && el) {
      el.addEventListener("wheel", handleWheel, { passive: false });
      return () => el.removeEventListener("wheel", handleWheel);
    }
  }, [isOpen, handleWheel]);

  return (
    <div ref={containerRef} className="relative flex-shrink-0">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={handleToggle}
        className="flex items-center gap-1.5 px-4 py-3.5 text-xs md:text-sm text-pulsar-lavender font-mono focus:outline-none transition-all duration-300 cursor-pointer hover:bg-white/[0.03] select-none h-full rounded-l-xl"
      >
        <span className="text-base select-none">{selectedCountry.flag}</span>
        <span>{selectedCountry.code}</span>
        <ChevronDown
          size={12}
          className={`text-on-surface-variant/40 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, scale: 0.95, y: openUpward ? 10 : -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: openUpward ? 10 : -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{
              backgroundColor: "rgba(10, 10, 15, 0.97)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(167, 139, 250, 0.25)",
              overscrollBehavior: "contain",
            }}
            className={`absolute ${
              openUpward ? "bottom-full mb-2" : "top-full mt-2"
            } left-0 w-72 max-h-[300px] rounded-xl z-[999] shadow-2xl flex flex-col`}
          >
            {/* Search input */}
            <div className="p-2 border-b border-white/[0.06]">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search country..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-starlight-white placeholder:text-on-surface-variant/40 focus:outline-none focus:border-pulsar-lavender/40 font-sans transition-colors duration-200"
              />
            </div>

            {/* Scrollable country list */}
            <div className="overflow-y-auto flex-1 p-1.5 scrollbar-thin scrollbar-thumb-white/10">
              {filteredCountries.length === 0 ? (
                <div className="px-3 py-4 text-center text-xs text-on-surface-variant/50 font-sans">
                  No countries found
                </div>
              ) : (
                filteredCountries.map((c) => {
                  const isSelected = c.code === selected && c.id === selectedCountry.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        onChange(c.code);
                        setIsOpen(false);
                        setSearch("");
                      }}
                      className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-left text-xs md:text-sm font-sans transition-all duration-200 hover:bg-white/[0.04] ${
                        isSelected
                          ? "text-pulsar-lavender bg-pulsar-lavender/10 font-semibold"
                          : "text-on-surface-variant hover:text-starlight-white"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base select-none">{c.flag}</span>
                        <span className="truncate max-w-[140px]">{c.name}</span>
                      </div>
                      <span className="font-mono text-xs opacity-80">{c.code}</span>
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
