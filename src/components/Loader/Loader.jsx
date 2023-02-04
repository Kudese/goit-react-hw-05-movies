import { TailSpin } from 'react-loader-spinner';
import s from './Loader.module.css';
export default function Loader() {
  return (
    <TailSpin
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass={s.Loader}
      visible={true}
    />
  );
}
