import { Stack } from "expo-router";

const StackLayout = () => {
    return(
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name="DetailScreen"/>
        </Stack>
    )
}

export default StackLayout