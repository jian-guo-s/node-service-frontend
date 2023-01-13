import React, { useState, useEffect } from 'react'
import Taro, { useRouter,getCurrentPages } from '@tarojs/taro'
import { View, Switch, Text } from '@tarojs/components'
import httpService from '../../service/httpService';
import NavBar from '@/components/Navbar/index'
import LineWrap from '@/components/LineWrap/index'
import BtnBottom from '@/components/BtnBottom/index'
import './index.scss'

const Index = () => {
  const router = useRouter()
  const [isFullDay, setIsFullDay] = useState<boolean>(false)
  const [startDate, setStartDate] = useState<String>('')
  const [endDate, setEndDate] = useState<String>('')
  const [title, setTitle] = useState<String>('')
  const [selectedDay, setSelectedDay] = useState<String>('')
  const [id, setId] = useState<number>(undefined)
  const [developerId, setDeveloperId] = useState<number>(undefined)

  useEffect(() => {
    let scheduleData = JSON.parse(router.params.scheduleData)
    if(scheduleData.id) {
      //  编辑/删除
      let start = scheduleData.startDate.split(' ')[1].slice(0,5)
      let end = scheduleData.endDate.split(' ')[1].slice(0,5)
      setStartDate(start)
      setEndDate(end)
      setTitle(scheduleData.title)
      setIsFullDay(scheduleData.isFullDay)
      setId(scheduleData.id)
      setDeveloperId(scheduleData.developerId)
      setSelectedDay(scheduleData.scheduleDate)
    } else {
      //  新增
      setSelectedDay(scheduleData.scheduleDate)
    }
    },[])

  const goBack = () => {
    Taro.navigateBack()
  }

  // 日程标题
  const onInputChange = (e) => {
    setTitle(e.target.value)
  }


  // 日程时间
  const onTimeChange = (e, value) => {
    console.log(value)
    if(value[0]) {
      setStartDate(value[0])
    }
    if(value[1]) {
      setEndDate(value[1])
    }
  }

  // 是否全天
  const checkChang = (e) => {
    console.log(startDate)
    setIsFullDay(e.target.value)
  }

  // 新增日程接口
  const saveAddSchedule = (type) => {
    let startDate1:string = ''
    let endDate1:string = ''

    if(isFullDay) {
      setSelectedDay('')
      startDate1 = ''
      endDate1 = ''
    } else {
      startDate1 = selectedDay +' ' + startDate+':00'
      endDate1 = selectedDay +' ' + endDate+':00'
    }

    let data: any = {
      developerId: '',
      endDate: endDate1,
      id: id? id :'',
      isFullDay: isFullDay,
      scheduleDate: selectedDay,
      startDate: startDate1,
      title: title,
    }
    if(!startDate1 || !startDate1) {
      Taro.showToast({
        title: '请选择时间',
      })
      return
    } else {
      if(type === 'add') {
        httpService.post('manpower-rest-api/interviewSchedule/add',{
          data:data
        }).then(() => {
          goBack()
        })
      } else {
        httpService.post('manpower-rest-api/interviewSchedule/update', {
          data: data
        }).then(() => {
          goBack()
        })
      }
    }
  }

  // 删除日程
  const saveDeleteSchedule = () => {
    httpService.post('manpower-rest-api/interviewSchedule/delete?scheduleId='+id, {
      data:null
    }).then(() => {
      goBack()
    })
  }

  return (
    <View className='schedule'>
      <NavBar onClick={goBack} title='新建日程'></NavBar>
      <LineWrap
        type='input'
        placeholder='日程'
        value={title}
        onChange={onInputChange}
      />
      <View className='select-controller'>
        <Text className='text'>全天</Text>
        <Switch checked={isFullDay} color="#4850FF" onChange={checkChang}></Switch>
      </View>
      {
        isFullDay ? null : <LineWrap
          type='timeMultiSelector'
          placeholder='时间'
          onChange={onTimeChange}
          value={[startDate,endDate]}
        />
      }

      {
        id && true ? <View className='btn-box btn-container'>
          <View className='btn delete'>
            <BtnBottom onClick={saveDeleteSchedule}>删除</BtnBottom>
          </View>
          <View className='btn'>
            <BtnBottom onClick={()=>saveAddSchedule('edit')}>保存</BtnBottom>
          </View>
        </View> : <View className='btn-container' >
          <BtnBottom onClick={()=>saveAddSchedule('add')}>保存</BtnBottom>
        </View>
      }
    </View>
  )
}

export default Index
