import { ArrowLeftIcon } from "@heroicons/react/20/solid"
type Props = {
    children: React.ReactNode
  }
export default function CustomHeader({children} :Props){


    return <>
    <header style={{backgroundColor : 'cornflowerblue', display :'flex', justifyContent:'space-between'}}>
      <span ><ArrowLeftIcon onClick={()=>window.history.back()} height={30} width={30} cursor="pointer" title="Go Back"/></span>
    {children}
    <span></span>
    </header>
    </>
}