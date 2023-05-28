import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import PickPhoto from '../../components/PickPhoto';
import DropList from '../../components/DropList';

import styles from './style';
import api from '../../services/api';

export default function Register({navigation}) {
    const [isSeller, setIsSeller] = useState(false);
    const [imageData, setImageData] = useState(null);
    const [link, setLink] = React.useState('Sou um vendedor');
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');

    function handleGetImage(image) {
        setImageData(image);
    }

    const schema = yup.object({
        firstName: step == 1 && yup.string().required("Informe o seu nome."),
        surName: step == 1 && yup.string().required("Informe o seu sobrenome."),
        email: step == 1 && yup.string().email("E-mail inválido.").required("Informe o seu e-mail."),
        phone: step == 3 && yup.string(),
        cnpj: step == 2 && isSeller && yup.string().required("Informe o seu CNPJ"),
        fantasyName: step == 2 && isSeller && yup.string().required("Informe o seu nome fantasia."),
        segment: step == 2 && isSeller && yup.string().required("Informe o seu segmento."),
        city: step == 3 && yup.string().required("Digite o seu nome da sua cidade."),
        district: step == 3 && yup.string().required("Digite o seu nome do seu bairro."),
        fair: step == 3 && yup.string(),
        nickname: step == 4 && yup.string().required("Digite o seu nome de usuário."),
        password: step == 4 && yup.string().min(6, "Senha deve conter ao menos 6 dígitos").required("Digite sua senha."),
        confirmPass: step == 4 && yup.string().oneOf([yup.ref('password'), null], "Confirme sua senha corretamente."),
    });

    const { control, handleSubmit, formState: { errors }, setFocus } = useForm({
        defaultValues: {
            cnpj: "",
            fantasyName: "",
            segment: "",
            photoUrl: "11gws99uAMTomOdVFwcn5fm5cZgP37Ol8",
            phone: ""
        },
        resolver: yupResolver(schema),
        reValidateMode: "onSubmit",
        shouldFocusError: true
    });

    async function handleRegister(data) {
        if(imageData) {
            const filename = imageData[0].uri.substring(imageData[0].uri.lastIndexOf('/') + 1, imageData[0].uri.length);
            const formData = new FormData();
            const extend = filename.split('.')[1];
            formData.append('file', JSON.parse(JSON.stringify({
                name: filename,
                uri: imageData[0].uri,
                type: 'image/' + extend,
                base64: imageData[0].base64,
            })));
            responseImage = await api.post("/picture/upload", formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
            });    
        }
        
        const fullName = data.firstName.trim()+' '+data.surName.trim();
        data.fullName = fullName;
        data.isSeller = isSeller;
        data.photoUrl = responseImage.data.imageUrl;
        data.location = {
            city : data.city,
            district : data.district
        }
        console.log(data.photoUrl);
        try {
            api.post("/user", data);
        } catch (err) {
            console.log(err);
        }
        navigation.navigate('Login');
    }

    const handleSellerClick = () => {
        if(link === 'Sou um vendedor') {
            setIsSeller(true);
            setLink('Sou um usuário');
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
                        label="Nome*"
                        name="firstName"
                    />
                    <Field
                        label="Sobrenome*"
                        name="surName"
                    />
                    <Field
                        label="E-mail*"
                        name="email"
                    />
                    <Field
                        label="Telefone"
                        name="phone"
                    />
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={handleSubmit(() => {
                            if(isSeller) {
                                setStep(step+1);
                                return;
                            }
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
                <Text style={styles.h1}>Feirante</Text>
                <Field
                    label="CNPJ*"
                    name="cnpj"
                />
                <Field
                    label="Nome Fantasia*"
                    name="fantasyName"
                />
                <Field
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
                        if(isSeller) {
                            setStep(step-1);
                            return;
                        };
                        setStep(step-2);
                    }
                    }>
                    <Entypo name="arrow-bold-left" color="#5C374C" size={46} />
                </TouchableOpacity>
                <Text style={styles.h1}>Localização</Text>
                <Field
                    label="Cidade*"
                    name="city"
                />
                {error.city && <Text style={styles.labelError}>{error.city}</Text>}
                <Field
                    label="Bairro*"
                    name="district"
                />
                {error.district && <Text style={styles.labelError}>{error.district}</Text>}
                {isSeller &&
                    <View>
                        <Text style={styles.p}>Qual feira você costuma frequentar?</Text>
                        <Field
                            label="Feira"
                            name="fair"
                        />
                    </View>
                }
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={handleSubmit(()=>setStep(step+1))}>
                    <Text style={styles.buttonText}>Continuar</Text>
                </TouchableOpacity>
            </View>}
            {step == 4 &&
            <View style={styles.form}>
                <TouchableOpacity 
                    style={{ position: 'absolute', top: 25, left: 20 }}
                    onPress={() => {setStep(step-1);}
                    }>
                    <Entypo name="arrow-bold-left" color="#5C374C" size={46} />
                </TouchableOpacity>
                <Text style={styles.h1}>Cadastro</Text>
                <View>
                    <PickPhoto handleGetImage={handleGetImage}/>
                </View>
                <Field
                    label="Nome de Usuário*"
                    name="nickname"
                />
                <Field
                    label="Senha*"
                    name="password"
                />
                <Field
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