import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import AuthRoute from "./components/routes/AuthRoute";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Loading from "./components/loading/Loading";
import Footer from "./components/layouts/Footer";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {green, orange, yellow} from '@material-ui/core/colors';

const Header = React.lazy(() => import("./components/layouts/Header"));

const MobileNavigation = React.lazy(() =>
    import(
        /* webpackChunkName: "header" */ "./components/layouts/MobileNavigation"
        )
);

const Login = React.lazy(() =>
    import(/* webpackChunkName: "login" */ "./pages/authPages/login")
);

const Register = React.lazy(() =>
    import(/* webpackChunkName: "register" */ "./pages/authPages/register")
);

const Logout = React.lazy(() =>
    import(/* webpackChunkName: "logout" */ "./pages/authPages/logout")
);

const ChangePassword = React.lazy(() =>
    import(
        /* webpackChunkName: "change-password" */ "./pages/authPages/changePassword"
        )
);

const ResetPassword = React.lazy(() =>
    import(
        /* webpackChunkName: "reset-password" */ "./pages/authPages/resetPassword"
        )
);

const ResetPasswordConfirm = React.lazy(() =>
    import(
        /* webpackChunkName: "reset-password-confirm" */ "./pages/authPages/resetPasswordConfirm"
        )
);

const Profile = React.lazy(() =>
    import(/* webpackChunkName: "profile" */ "./pages/profilePages/profile")
);

const ProfileProducts = React.lazy(() =>
    import(
        /* webpackChunkName: "personal-info" */ "./pages/profilePages/myProducts"
        )
);

const AddProfileProduct = React.lazy(() =>
    import(
        /* webpackChunkName: "personal-info-edit" */ "./pages/profilePages/myProducts/AddProduct"
        )
);

const PersonalInfoEdit = React.lazy(() =>
    import(
        /* webpackChunkName: "personal-info-edit" */ "./pages/profilePages/personalInfoEdit"
        )
);

const Addresses = React.lazy(() =>
    import(/* webpackChunkName: "addresses" */ "./pages/profilePages/addresses")
);

const FavoriteProducts = React.lazy(() =>
    import(
        /* webpackChunkName: "favorite-products" */ "./pages/profilePages/favoriteProducts"
        )
);

const Orders = React.lazy(() =>
    import(/* webpackChunkName: "orders-history" */ "./pages/profilePages/orders")
);

const OrdersDetail = React.lazy(() =>
    import(
        /* webpackChunkName: "orders-detail" */ "./pages/profilePages/ordersDetail"
        )
);

const Products = React.lazy(() =>
    import(/* webpackChunkName: "products" */ "./pages/productPages/products")
);
const ProductsFilter = React.lazy(() =>
    import(/* webpackChunkName: "products" */ "./pages/productPages/ProductsFilter")
);

const ProductsDetail = React.lazy(() =>
    import(
        /* webpackChunkName: "products-detail" */ "./pages/productPages/productsDetail"
        )
);

const Cart = React.lazy(() =>
    import(/* webpackChunkName: "cart" */ "./pages/checkoutPages/cart")
);

const Order = React.lazy(() =>
    import(/* webpackChunkName: "order" */ "./pages/checkoutPages/order")
);

const Index = () => <Redirect to="/products"/>;


const outerTheme = createMuiTheme({
    palette: {
        primary: {
            main: yellow[600]
            ,
        },
        secondary: {
            main: yellow[600]
        }
    },
});


const Routes = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("xs"));

    return (
        <React.Suspense fallback={<Loading/>}>
            {!matches && <Header/>}
            <Loading inFetching/>
            <div className="px-6 min-h-screen">
                <ThemeProvider theme={outerTheme}>
                    <Switch>
                        <Route exact path="/" component={Index}/>
                        <ProtectedRoute exact path="/logout" component={Logout}/>
                        <AuthRoute exact path="/login" component={Login}/>
                        <AuthRoute exact path="/register" component={Register}/>
                        <AuthRoute exact path="/reset-password" component={ResetPassword}/>
                        <AuthRoute
                            exact
                            path="/reset-password/:token"
                            component={ResetPasswordConfirm}
                        />
                        <ProtectedRoute
                            exact
                            path="/change-password"
                            component={ChangePassword}
                        />
                        <ProtectedRoute exact path="/profile" component={Profile}/>

                        <ProtectedRoute
                            exact
                            path="/profile/products"
                            component={ProfileProducts}
                        />

                        <ProtectedRoute
                            exact
                            path="/profile/products/add"
                            component={AddProfileProduct}
                        />

                        <ProtectedRoute
                            exact
                            path="/profile/personal-info/edit"
                            component={PersonalInfoEdit}
                        />


                        <ProtectedRoute exact path="/profile/addresses" component={Addresses}/>
                        <ProtectedRoute
                            exact
                            path="/profile/favorite-products"
                            component={FavoriteProducts}
                        />
                        <ProtectedRoute exact path="/profile/orders" component={Orders}/>
                        <ProtectedRoute
                            exact
                            path="/profile/orders/:id"
                            component={OrdersDetail}
                        />
                        <Route exact path="/products" component={Products}/>
                        <Route exact path="/products/filter" component={ProductsFilter}/>
                        <Route exact path="/products/:slug" component={ProductsDetail}/>
                        <ProtectedRoute exact path="/cart" component={Cart}/>
                        <ProtectedRoute exact path="/order" component={Order}/>
                    </Switch>
                </ThemeProvider>
            </div>
            <Footer/>

            {/*{matches && <MobileNavigation />}*/}
        </React.Suspense>
    );
};

export default Routes;
