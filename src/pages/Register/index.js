import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert, Linking } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Dropdown } from 'react-native-element-dropdown';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

import PickPhoto from '../../components/PickPhoto';

import styles from './style.js';
import api from '../../services/api';

export default function Register({navigation}) {
    const [isSeller, setIsSeller] = useState(false);
    const [imageData, setImageData] = useState(null);

    const [city, setCity] = useState(null);
    const [citiesData, setCitiesData] = useState(null);
    const [fairsData, setFairsData] = useState(null);
    const [fair, setFair] = useState(null);

    const [link, setLink] = React.useState('Sou um vendedor');
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [responseImage, setResponseImage] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    useEffect(()=> {
        getFairs();
        getCities();
    },[])

    function handleGetImage(image) {
        setImageData(image);
    }

    const getCities = async () => {
        const res = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/SP/municipios');
        setCitiesData(res.data);
    }

    const getFairs = async () => {
        try {
            const res = await api.get('/fair');
            setFairsData(res.data);
        } catch (err) {
            Alert.alert(err.response.data);  
        }
    }

    const schema = yup.object({
        firstName: step == 1 && yup.string().required("Informe o seu nome.").trim(),
        surName: step == 1 && yup.string().required("Informe o seu sobrenome.").trim(),
        email: step == 1 && yup.string().email("E-mail inválido.").required("Informe o seu e-mail.").trim(),
        phone: step == 1 && yup.string().nullable().trim(),
        cnpj: step == 2 && isSeller && yup.string().required("Informe o seu CNPJ").trim(),
        fantasyName: step == 2 && isSeller && yup.string().required("Informe o seu nome fantasia.").trim(),
        segment: step == 2 && isSeller && yup.string().required("Informe o seu segmento.").trim(), 
        district: step == 3 && yup.string().required("Digite o seu nome do seu bairro.").trim(),
        nickname: step == 4 && yup.string().required("Digite o seu nome de usuário.").trim(),
        password: step == 4 && yup.string().min(6, "Senha deve conter ao menos 6 dígitos").required("Digite sua senha.").trim(),
        confirmPass: step == 4 && yup.string().oneOf([yup.ref('password'), null], "Confirme sua senha corretamente.").trim(),
    });

    const { control, handleSubmit, formState: { errors }} = useForm({
        defaultValues: {
            cnpj: "",
            fantasyName: "",
            segment: "",
            phone: "",
        },
        resolver: yupResolver(schema),
        reValidateMode: "onSubmit",
        shouldFocusError: true
    });

    async function handleRegister(data) {
        if(!toggleCheckBox) {
            Alert.alert("Não foi possível efetuar cadastro", "Marque a caixa concordando com os nossos termos de uso e políticas")
            return;
        }
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
            const res = await api.post("/picture/upload", formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
            });
            setResponseImage(res);    
        }
        data.fullName = data.firstName.trim()+' '+data.surName.trim();
        data.isSeller = isSeller;
        data.photoUrl = responseImage?responseImage.data.imageUrl:"11gws99uAMTomOdVFwcn5fm5cZgP37Ol8";
        data.location = {
            city : city,
            district : data.district
        }; 
        data.fair = fair;
        try {
            const resData = await api.post("/user", data);
            navigation.navigate('Login');
            Alert.alert(resData.data);              
        } catch (err) {
            Alert.alert(err.response.data);
        }
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

    const handleSendToTerms = () => {
        Linking.openURL("https://pointfair.netlify.app/politica-de-privacidade-app.html")
    }

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
                            value={props.value?props.value:value}
                            secureTextEntry={props.isPassword}
                            placeholderTextColor={"#ccc"}
                            placeholder={`Insira seu ${props.label.toLowerCase().replace(/[*]/, '')}`}
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
                <View style={styles.group}>
                    <Text style={styles.p}>Cidade*</Text>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={citiesData}
                        search
                        maxHeight={300}
                        labelField="nome"
                        valueField="id"
                        placeholder={!isFocus ? 'Selecione sua cidade' : '...'}
                        searchPlaceholder="Buscar..."
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setCity(item.nome);
                            setIsFocus(false);
                        }}
                    />
                </View>
                <Field
                    label="Bairro*"
                    name="district"
                />
                {error.district && <Text style={styles.labelError}>{error.district}</Text>}
                {isSeller && (
                    <View style={styles.group}>
                        <Text style={styles.p}>Qual feira costuma frequentar?*</Text>
                        <Dropdown
                            style={[styles.dropdown, {marginBottom: 15}, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={fairsData}
                            search
                            maxHeight={300}
                            labelField="name"
                            valueField="_id"
                            placeholder={!isFocus ? 'Selecione uma feira' : '...'}
                            searchPlaceholder="Buscar..."
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setFair(item._id);
                                setIsFocus(false);
                            }}
                        />
                        <Text style={styles.p}>Não encontrou sua feira?</Text>
                        <TextInput 
                            style={styles.input}
                            placeholderTextColor={"#ccc"}
                            placeholder="São Paulo, Brás - Feira do brás"
                        />
                    </View>
                )}
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
                    isPassword={true}
                />
                <Field
                    label="Confirmar Senha*"
                    name="confirmPass"
                    isPassword={true}
                />
                {error.email && <Text style={styles.labelError}>{error.email}</Text>}
                {error.cnpj && <Text style={styles.labelError}>{error.cnpj}</Text>}
                <View style={{flexDirection:'row', alignItems: 'flex-start', paddingHorizontal: 20}}>
                    <BouncyCheckbox
                        size={25}
                        fillColor='#5C374C'
                        unfillColor='#fff'
                        textStyle={{ color: "#5C374C"}}
                        iconStyle={{ borderColor: "#5C374C" }}
                        innerIconStyle={{ borderWidth: 2 }}
                        value={toggleCheckBox}
                        onPress={(value) => setToggleCheckBox(value)}
                    />
                    <Text style={{fontSize: 16}}>
                        Concordo com os
                        <TouchableOpacity onPress={handleSendToTerms}>
                            <Text style={[styles.link]}>termos de serviço e uso</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={handleSubmit(handleRegister)}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>}
        </SafeAreaView>
    );
}