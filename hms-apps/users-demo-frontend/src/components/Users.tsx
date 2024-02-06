import { H1 } from "../../@/components/ui/typography";
import { useQuery } from "@tanstack/react-query";
//import { useEffect, useState } from "react";
import {User} from '@common/hms-lib';
import DisplayUsers from "./DisplayUsers";
import { useTranslation } from "react-i18next";

type Props = {
  title?: string
}

const Users: React.FC<Props> = () => {


  //use below if using useEffect. Not efficient enough.
  /*const [users, setUsers] = useState<any>();
  const fetchUsers = () => {
    fetch("/users")
      .then((response) => response.json()
        .then((data) => {
          setUsers(data)
        })
      )
  }
  useEffect(() => {
    fetchUsers()
  }, [])*/

  //let's follow the react query approach
  const fetchUsers = async () => {
    const res = await fetch("/users");
    return await res.json();
  }
  const { isPending, error, data } = useQuery({
    queryKey: ['remote-users'],
    queryFn: fetchUsers,
  })
  if (isPending) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message

  //const data = useMemo(() => serverData ?? [], [serverData]);

   //Below uses internationalization for menu, unlike above
   const { t, i18n } = useTranslation();
   //Or You can narrow down useTranslation() to one or more namespaces as shown below
   //const { t, i18n } = useTranslation('adm'); //narrow down to a namespace or array of namespaces if necessary
   //const { t, i18n } = useTranslation(['public','adm']);

   //prepare language util

   //@ts-ignore //language could be passed down to everywhere. Not in use now. hence //@ts-ignore
   const [language, setLanguage] = useState(i18n.language);

   //Below is an example of a callback function called from a select event to change language. Not in use here, hence the //@ts-ignore
   //@ts-ignore
   const changeLanguage = async (e: { target: { value: string | undefined; }; }) => {
       //Notice that in the default lng in i18n.js is en. Of course, you should make this more state managed with a language selection UI
       await i18n.changeLanguage(e.target.value); //set the language
       setLanguage(i18n.language);//update state to provoke rerender
   }

   

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
          <H1>{t('users')}</H1>
          <DisplayUsers data={data.users as User[]}/>
      </section>
    </>
  )
}

export default Users;