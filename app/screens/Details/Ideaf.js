import React from 'react'
import { View, Text } from 'react-native'
import Container from '../../components/Container'
import IdrafComp from '../../components/IdrafComp';

export default function Ideaf({navigation, route}) {
    console.log( route.params.viewModel );
    return (
        <Container showBack    >
             <IdrafComp viewModel={ route?.params?.viewModel } judgement={ route?.params?.viewModel?.Judgement} />
        </Container>
    )
}
