import { useQuery } from "@tanstack/react-query";
import { GetAllBrandsAPI } from "@/services/api/GetAllBrands";

export const useBrandsQuery = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () => GetAllBrandsAPI(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
