import { MMKRate } from "@/data/constant";

export const readUploadFile = ({
  file,
  onLoad,
}: {
  file: any;
  onLoad: (file: any) => void;
}) => {
  const fileReader = new FileReader();
  fileReader.onload = () => {
    if (fileReader.readyState === 2) onLoad(fileReader.result);
  };
  fileReader.readAsDataURL(file);
};

export const updateSession = async () => {
  await fetch("/api/auth/session?update");
  setTimeout(() => window.location.reload(), 500);
};

export const formatPrice = (price: number) => {
  return `$${price} (${(price * MMKRate).toLocaleString()})MMK`;
};

export const getMMKRate = (price: number) => {
  return `${(price * MMKRate).toLocaleString()}MMK`;
};

export function isValidEmail(email: string) {
  if (!email) return false;
  const trimmed = email?.replace(/[\u200e\u200f]/g, "");
  return !!trimmed?.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/);
}

export const appendS = (num: number) => (num > 1 ? "s" : "");

export const getPromotionValue = ({
  value,
  percent,
}: {
  value: number;
  percent: number;
}) => value - +(value * (percent / 100)).toFixed(2);
