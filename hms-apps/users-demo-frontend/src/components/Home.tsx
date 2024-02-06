import { useTranslation } from "react-i18next";
import { H1 } from "../../@/components/ui/typography";

type Props = {
    title?: string
}

const Home:React.FC<Props> = () => {

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
          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
            <H1>
              {t('home page')}
            </H1>
          </div>
        </section>
        </>
      )
}

export default Home;