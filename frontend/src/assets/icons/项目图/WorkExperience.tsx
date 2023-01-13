import React, { useState, FC, useEffect } from 'react'
import { View, Image, Input, Picker, Button } from "@tarojs/components"
import httpService from '../../../service/httpService';
import LineWrap from './line-wrap';
import Taro from "@tarojs/taro";

type PageProps = {
  data: any
  type: string
}

const BaseInfo: FC<PageProps> = ({ data, type }) => {

  useEffect(() => {
    setCurIndustryName(params.industryName)
    // 行业接口
    httpService.get(`/dictionary/getByParentId/1`).then(res => {
      if (res) {
        setIndustry([[...res], [...res[0].children]])
      }
    }).catch(e => {
      console.log(e);
    })
  }, [])

  const [params, setParams] = useState<any>(type === 'edit' ? { ...data } : {})
  const [curIndustryName, setCurIndustryName] = useState<string>('')
  const [industry, setIndustry] = useState<any>([])
  // const [companyName, setCompanyName] = useState<string>(type === 'edit' ? data.companyName : '')

  const onInputChange = (e) => {
    console.log(e.target.value);
    setParams({
      ...params,
      companyName: e.target.value,
    })
  }

  const onIndustryChange = (e) => {
    let item = e.target.value
    setParams({ ...params, industryId: industry[0][item[0]].children[item[1]].id })
    setCurIndustryName(industry[0][item[0]].children[item[1]].name)
  }

  const onColumnChange = (e) => {
    if (e.target.column === 0) {
      setIndustry([[...industry[0]], [...industry[0][e.target.value].children]])
    }
  }

  const onJobChange = (e) => {
    console.log(e);
    setParams({
      ...params,
      positionName: e.target.value
    })
  }

  const onTimeChange = (e, value) => {
    console.log(value);
    setParams({...params,workStartTime: value[0], workEndTime: value[1] })
  }

  const saveWorkExperience = () => {
    httpService.post('/developer/add/work', {
      data: params,
    }).then(res => {
      console.log(res)
      Taro.navigateBack()
    })
  }

  return (
    <View>
      <View className='education-title'>添加工作经历</View>
      <LineWrap
        type='input'
        placeholder='公司名称'
        value={params.companyName}
        onChange={onInputChange}
      />
      <LineWrap
        type='selectMultiSelector'
        placeholder='所在行业'
        range={industry}
        value={curIndustryName}
        rangeKey={'name'}
        onChange={onIndustryChange}
        onColumnChange={onColumnChange}
      />
      <LineWrap
        type='input'
        value={params.positionName}
        placeholder='职位名称'
        onChange={onJobChange}
      />
      <LineWrap
        type='dateMultiSelector'
        value={[params.workStartTime,params.workEndTime]}
        placeholder='入职时间'
        onChange={onTimeChange}
      />
      <View className='bottom-btn-box'>
          <Button className='btn' onClick={saveWorkExperience}>保存</Button>
      </View>
    </View>
  )
}

BaseInfo.propTypes = {

}

export default BaseInfo
