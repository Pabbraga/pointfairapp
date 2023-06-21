import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAuth } from '../../context/auth';
import styles from './style.js';
import api from '../../services/api';

export default function ScheduleChange({navigation}) {
    const { user, signed, reloadUser } = useAuth();

    const schema = yup.object({
        sunday: yup.string().trim(),
        monday: yup.string().trim(),
        tuesday: yup.string().trim(),
        wednesday: yup.string().trim(),
        thursday: yup.string().trim(),
        friday: yup.string().trim(),
        saturnday: yup.string().trim(),
    })

    const { control, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema),
        reValidateMode: "onSubmit",
        shouldFocusError: true
    });

    async function handleUpdate(data) {
        try {
            const res = await api.put(`/user/schedule/${user._id}`, data);
            reloadUser(user.email, null, signed);
            Alert.alert(res.data);
        } catch (err) {
            Alert.alert(err.response.data);        
        }
        
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
                            placeholder={props.value}
                            maxLength={22}
                        />
                    </View>
                )}
            />
        )
    }

    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{position: 'absolute', top: 30, left: 20}}>
                <Entypo name='arrow-bold-left' color={'#5C374C'} size={46}/>
            </TouchableOpacity>
            <Text style={styles.title}>Editar horários</Text>
            <View style={styles.form}>
                <Field
                    label={'Domingo:'}
                    name={'sunday'}
                    value={user.schedules.sunday}
                />
                <Field
                    label={'Segunda:'}
                    name={'monday'}
                    value={user.schedules.monday}
                />
                <Field
                    label={'Terça:'}
                    name={'tuesday'}
                    value={user.schedules.tuesday}
                />
                <Field
                    label={'Quarta:'}
                    name={'wednesday'}
                    value={user.schedules.wednesday}
                />
                <Field
                    label={'Quinta:'}
                    name={'thursday'}
                    value={user.schedules.thursday}
                />
                <Field
                    label={'Sexta:'}
                    name={'friday'}
                    value={user.schedules.friday}
                />
                <Field
                    label={'Sábado:'}
                    name={'saturnday'}
                    value={user.schedules.saturnday}
                />
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={handleSubmit(handleUpdate)}
                >
                    <Text style={styles.buttonText}>Concluído</Text>
                </TouchableOpacity>  
            </View>
        </SafeAreaView>
    )
}