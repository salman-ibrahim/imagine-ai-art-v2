import React from "react";
import {View} from "react-native";
import {Layout} from "@ui-kitten/components";

const AuthLayout = (props) => {

    return (
        <Layout>
            {/*Header */}
            <View>

            </View>

            {/* Inject Component Here */}
            <Layout styles={{flexGrow:1}}>
                <props.component/>
            </Layout>
            {/* Bottom Navigation*/}
            <View>
                <Text></Text>
            </View>
        </Layout>
    )
}

export default AuthLayout;
