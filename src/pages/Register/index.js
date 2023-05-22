import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './style';
import axios from 'axios';

export default function Register({navigation}) {
    const [isSeller, setIsSeller] = useState(false);
    const [link, setLink] = React.useState('Sou um vendedor');
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');

    const schema = yup.object({
        firstName: step == 1 && yup.string().required("Informe o seu nome."),
        surName: step == 1 && yup.string().required("Informe o seu sobrenome."),
        email: step == 1 && yup.string().email("E-mail inválido.").required("Informe o seu e-mail."),
        cnpj: step == 2 && yup.string().required("Informe o seu CNPJ"),
        fantasyName: step == 2 && yup.string().required("Informe o seu nome fantasia."),
        segment: step == 2 && yup.string().required("Informe o seu segmento."),
        nickname: step == 3 && yup.string().required("Digite o seu nome de usuário."),
        password: step == 3 && yup.string().min(6, "Senha deve conter ao menos 6 dígitos").required("Digite sua senha."),
        confirmPass: step == 3 && yup.string().oneOf([yup.ref('password'), null], "Confirme sua senha corretamente.")
    });

    const { control, handleSubmit, formState: { errors }, setFocus } = useForm({
        defaultValues: {
            cnpj: "",
            fantasyName: "",
            segment: "",
            phone: "",
            location: "64693c5914e6f088aa8d9c66"
        },
        resolver: yupResolver(schema),
        reValidateMode: "onSubmit",
        shouldFocusError: true
    });

    function handleRegister(data) {
        const fullName = data.firstName.trim()+' '+data.surName.trim();
        data.fullName = fullName;
        data.isSeller = isSeller;
        data.phone = "";
        data.photo = "picture.jpg";
        axios.post("https://pointfair.onrender.com/user", data).catch((error) => console.log(error));
        navigation.navigate('Login');
    }

    const handleSellerClick = () => {
        if(link === 'Sou um vendedor') {
            setIsSeller(true);
            setLink('Sou um cliente');
        }
        else {
            setIsSeller(false);
            setLink('Sou um vendedor');
        }
    };

    function Field(props) {
        return (
            <Controller
                control={control}
                name={props.name}
                render={({ field: { onChange, value }})=>(
                    <View style={styles.group}>
                        <Text style={styles.p}>{props.label}</Text>
                        <TextInput 
                            style={styles.input} 
                            onChangeText={onChange}
                            value={value}
                        />
                        {errors[props.name] && <Text style={styles.labelError}>{errors[props.name]?.message}</Text>}
                    </View>
                )}
            />
        )
    }

    return(
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='#FFC15E' translucent={false}/>
            {step == 1 && 
                <View style={styles.form}>
                    <TouchableOpacity 
                        style={{ position: 'absolute', top: 25, left: 15 }}
                        onPress={()=>navigation.goBack()}>
                        <Entypo name="arrow-bold-left" color="#5C374C" size={46} />
                    </TouchableOpacity>
                    <Text style={styles.h1}>Cadastrar-se</Text>
                    <Field
                        control={control}
                        label="Nome*"
                        name="firstName"
                    />
                    <Field
                        control={control}
                        label="Sobrenome*"
                        name="surName"
                    />
                    <Field
                        control={control}
                        label="E-mail*"
                        name="email"
                    />
                    <Field
                        control={control}
                        label="Telefone"
                        name="phone"
                    />
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={handleSubmit(() => {
                            if(isSeller) setStep(step+1);
                            setStep(step+2)
                            }
                        )}>
                        <Text style={styles.buttonText}>Continuar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.opacity} onPress={()=>{navigation.navigate('Login')}}>
                        <Text style={styles.link}>Já possuo uma conta</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.opacity} onPress={handleSellerClick}>
                        <Text style={styles.link}>{link}</Text>
                    </TouchableOpacity>
                </View>}
            {step == 2 &&
            <View style={styles.form}>
                <TouchableOpacity 
                    style={{ position: 'absolute', top: 25, left: 20 }}
                    onPress={() => {setStep(step-1)}}>
                    <Entypo name="arrow-bold-left" color="#5C374C" size={46} />
                </TouchableOpacity>
                <Text style={styles.h1}>Cadastro</Text>
                <Field
                    control={control}
                    label="CNPJ*"
                    name="cnpj"
                />
                <Field
                    control={control}
                    label="Nome Fantasia*"
                    name="fantasyName"
                />
                <Field
                    control={control}
                    label="Segmento*"
                    name="segment"
                />
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={handleSubmit(()=>setStep(step+1))}>
                    <Text style={styles.buttonText}>Continuar</Text>
                </TouchableOpacity>
            </View>}
            {step == 3 &&
            <View style={styles.form}>
                <TouchableOpacity 
                    style={{ position: 'absolute', top: 25, left: 20 }}
                    onPress={() => {
                        if(isSeller) setStep(step-1);
                        setStep(step-2);
                    }
                    }>
                    <Entypo name="arrow-bold-left" color="#5C374C" size={46} />
                </TouchableOpacity>
                <Text style={styles.h1}>Cadastro</Text>
                <Field
                    control={control}
                    label="Nome de Usuário*"
                    name="nickname"
                />
                <Field
                    control={control}
                    label="Senha*"
                    name="password"
                />
                <Field
                    control={control}
                    label="Confirmar Senha*"
                    name="confirmPass"
                />
                {error.email && <Text style={styles.labelError}>{error.email}</Text>}
                {error.cnpj && <Text style={styles.labelError}>{error.cnpj}</Text>}
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={handleSubmit(handleRegister)}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>}
        </SafeAreaView>
    );
}