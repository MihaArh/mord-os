import { useDispatch } from 'react-redux';
import type { AppDispatch } from 'store/configureStore';

const useAppDispatch: () => AppDispatch = useDispatch;

export default useAppDispatch;
