
import loader from '/loading.gif'
export const Loading = () => {
  return (
    <div className='w-full h-full flex items-center justify-center bg-black'>
        <img className='scale-150' src={loader} alt="" />
    </div>
  )
}
export default Loading;