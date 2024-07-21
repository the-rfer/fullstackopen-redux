import { setFilter as filter } from '../reducers/filterSlicer';
import { useDispatch } from 'react-redux';

const Filter = () => {
    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(filter(e.target.value));
    };
    const style = {
        marginBottom: 10,
    };

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    );
};

export default Filter;
