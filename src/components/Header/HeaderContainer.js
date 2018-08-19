import React, { Component } from 'react';
import { Query } from "react-apollo";
import { GET_AUTH_USER } from "../../graphql/queries";
import Header from "../Header/Header";


class HeaderContainer extends Component {
    state = {
        errors: []
    }
    
    render() {
        const { errors } = this.state;
        return (
            <div>
                <Query 
                    query={GET_AUTH_USER}
                    fetchPolicy="cache"
                >
                {({ loading, error, data }) => {
                    if (loading) return "Loading...";
                    if (error) {
                        errors[0] = `Error! ${error.message}`
                        data = {};
                    };
                    if (!data.getAuthUser) {
                        return <Header 
                            user={data}
                            errors={errors}
                            {...this.props}
                        />
                    }
                    return <Header 
                        user={data.getAuthUser}
                        {...this.props}
                    />
                }}
                </Query>
            </div>
        )
    }
}

export default HeaderContainer;