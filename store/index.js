import Vuex from 'vuex';
const createStore = () => {
  return new Vuex.Store({
    state: {


    },
    getters: {
      women: state => filter(state.products, 'category', 'women'),
      men: state => filter(state.products, 'category', 'men'),
      sale: state => filter(state.products, 'sale', true)
    },
    mutations: {
      set(state, params) {
        const keys = Object.keys(params);
        keys.forEach(x => {
          const val = params[x];
          // db.set(x, val).write();
          state[x] = val;
        });
      },
      switchSale: state => {
        state.sale = !state.sale;
      },
      clearCartCount: state => {
        state.cartTotal = 0;
      },
      clearCartContents: state => {
        state.cart = {};
      },
      addItem: (state, item) => {
        console.log(item)
        const { id, name, sale_price, img_list } = item
        const index = state.cart.findIndex(x => x.id === id)
        if (index > -1) {
          console.log(state.cart[index].count)
          state.cart[index].count = state.cart[index].count + 1
        } else {
          state.cart.push(
            {
              id: id,
              name: name,
              price: sale_price,
              count: 1,
              img: img_list[0]
            }
          )
        }
      },
      minusItem: (state, item) => {
        const { id } = item
        const index = state.cart.findIndex(x => x.id === id)
        const count = state.cart[index].count
        if (count === 1) {
          state.cart.splice(index, 1)
        } else {
          state.cart[index].count = count - 1
        }
      }
    }
  });
};

export default createStore;

// helper
const filter = (array, key, value) => array.filter(item => item[key] === value);
