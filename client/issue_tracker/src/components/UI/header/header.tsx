
type Props = {
    children: React.ReactNode
  }
export default function CustomHeader({children} :Props){
    return <>
    <header style={{backgroundColor : 'cornflowerblue'}}>
    {children}
    </header>
    </>
}