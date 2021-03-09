import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import Container from '../../components/Container'
import CustomLabel from '../../components/CustomLabel/CustomLabel'

export default function TopicDetail({ navigation }) {
    return (
        <Container isScrollable showHome showMenu onHome={()=>navigation.navigate("Home")}>
            <View>
                <CustomLabel text={"Supreme Court Bar Association V. Union Of India"} labelStyle={styles.title} />
                <CustomLabel text={`DR. ANAND. J.

1. In Re: Vinay Chandra Mishra, this Court found the Contemner , an advocate, guilty of committing criminal contempt of Court for having interfered with and "obstructing the course of justice by trying to threaten, overawe and overbear the court by using insulting, disrespectful and threatening language", While awarding punishment, keeping in view the gravity of the contumacious conduct of the contemner, the Court said:

" The facts and circumstances of the Present Case justify our invoking the power under Article 1 29 read with Article 142 of the Constitution to award to the contemner a suspended sentence of imprisonment together with suspension of his practice as and advocate in the manner directed herein. We accordingly sentence the contemner for his conviction for the offence of the criminal contempt as under:
Supreme Court Bar Association v. Union Of India  `} labelStyle={styles.bodyText} />

            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: scale(16),
        fontWeight: "bold"
    },
    bodyText: {

    }
})
