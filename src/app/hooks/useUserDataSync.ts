import { useGetUser } from "./useGetUser";

export const useUserDataSync = () => {
  const { data: userId, isLoading, error } = useGetUser();

  if(isLoading){
    console.log('is loading')
    return
  }
};
