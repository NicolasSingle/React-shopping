import { combineReducers } from 'redux-immutable';
import { reducer as homeReducer } from '../pages/home/store';
import { reducer as categoryReducer } from 'pages/category/store';
import { reducer as detailsReducer } from '../pages/details/store';
import { reducer as shoppingCartReducer } from '../pages/shoppingCart/store';
import { reducer as loginReducer } from '../pages/login/store';


const reducer = combineReducers({
	home: homeReducer,
	category: categoryReducer,
	details: detailsReducer,
	shoppingCart: shoppingCartReducer,
	login: loginReducer
});

export default reducer;
