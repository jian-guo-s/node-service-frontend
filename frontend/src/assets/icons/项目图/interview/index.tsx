import React, {useState, useEffect} from 'react'
import Taro from '@tarojs/taro'
import Navbar from "@/components/Navbar"
import { View, Text, Image } from '@tarojs/components'
import httpService from '../../service/httpService';
import iconAdd from "@/assets/images/icon_add.png"
import iconClock from "@/assets/images/icon_clock.png"
import "./index.scss"

type CalendarData = {
  currentYear: number
  currentMonth: number
  currentDay: number
  weekDays: Array<string>
  monthDays: any    // 月份日期数组
  today: string
  active?: boolean
}

const Index = () => {
  const [calendarData, setCalendarData] = useState<CalendarData>({
    currentYear: 0,    // 当前年
    currentMonth: 0,    // 当前月
    currentDay: 0,    // 当前日
    weekDays: ["日", "一", "二", "三", "四", "五", "六"],
    monthDays: null,    // 月份日期数组
    today: "",    // 今天日期
  })
  const [selectDay, setSelectDay] = useState('')
  const [selectMonth, setSelectMonth] = useState('')
  const [interviewScheduleList, setInterviewScheduleList] = useState([])



  useEffect(() => {

    let currentDate = new Date();  // 获取今天日期
    let currentYear = currentDate.getFullYear(); // 获得当前年
    let currentMonth = currentDate.getMonth() + 1;     // 获得当前月
    let today = currentYear + "-" + currentMonth + "-" + currentDate.getDate();
    let monthDays = getCurrentDateArray(currentYear, currentMonth, today)

    // 传递给创建日程页面数据
    let day = currentDate.getDate().toString().padStart(2,'0')
    let month = currentMonth.toString().padStart(2,'0')
    setSelectDay(day)
    setSelectMonth(month)


    // 默认选中今天
    monthDays.map(item => {
      item.map(val => {
        val.strDay = val.day.toString().padStart(2,'0')
        if(val.day === currentDate.getDate()) {
          return val.active = true
        }
      })
    })

    httpService.get('/interviewSchedule/appList', {
      data: {},
    }).then(res => {
      // console.log(res,'res')
      monthDays.map(item => {
        item.map(val => {
          res.map(it => {
            if(val.strDay == it.scheduleDate.split('-')[2]) {
              val.status = it.status
            }
          })
        })
      })
    })

    setCalendarData({
      ...calendarData,
      currentYear,
      currentMonth,
      today,
      monthDays,
    })
  }, [])


  // 查询某日日程
  useEffect(() => {
    if(selectDay) {
      let date = calendarData.currentYear + '-' + selectMonth + '-' + selectDay
      httpService.get('/interviewSchedule/appSchedule', {
        data: {
          date: date
        }
      }).then((res) => {
        setInterviewScheduleList(res)
      }).catch(e => {
        console.log(e);
      })
    } else {
      return
    }
  }, [selectDay])


  // 点击选择日程
  const onSelectDay = (e, rowIndex, index,) => {
    let monthDays = [...calendarData.monthDays]

    let day = monthDays[rowIndex][index].day.toString().padStart(2,'0')
    let month = (monthDays[rowIndex][index].month === "current"? calendarData.currentMonth: calendarData.currentMonth-1).toString().padStart(2,'0')
    setSelectDay(day)
    setSelectMonth(month)

    monthDays = monthDays.map((item) => {
      return item.map(i => {
        return {...i, active: false}
      })
    })

    monthDays[rowIndex][index].active = true
    setCalendarData({...calendarData, monthDays: monthDays})
    // console.log(calendarData, 'calendarData')
  }


  const getCurrentDateArray = (year, month, today?) => {
    // 获得当前月多少天以及当前月第一天是周几
    let { monthDaysCount, firstDayWeek } = getCurrentMonthDayNum(year,month);
    // 获得当前月份第一天所在周的上个月起始日期
    let beforeMonthDays =
      getBeforeMonth(year, month).monthDaysCount - firstDayWeek + 1;
    let days: any = [];
    var afterDay = 0;
    // 一个月份的时间跨度最多不超过六周即42天
    for (let index = 0; index < 42; index++) {
      // 上一个月日期 当前月份1号之前的天数都是上个月的日期
      if (index < firstDayWeek) {
        days.push({ day: beforeMonthDays++, month: "before" });
        // 当前月日期
      } else if (index >= firstDayWeek &&index < firstDayWeek + monthDaysCount) {
        days.push({ day: index - firstDayWeek + 1, month: "current" });
        // 下一个月日期
      } else {
        days.push({ day: ++afterDay, month: "after" });
      }
      days[index].active = false
    }
    // 日期分组分为6组
    let daysObj: any = [];
    daysObj.push(days.slice(0, 7));
    daysObj.push(days.slice(7, 14));
    daysObj.push(days.slice(14, 21));
    daysObj.push(days.slice(21, 28));
    daysObj.push(days.slice(28, 35));
    daysObj.push(days.slice(35, 42));

    // 通过当前的日期天过滤数据
    let index = daysObj.findIndex(row => {
      return row.findIndex(week => {
        if (week.day === Number(today.split('-')[2])) {
          return true
        }
        return false
      }) !== -1
    })
    return [daysObj[index], daysObj[index + 1]];
  }

  // 获得前一个月天数
  const getBeforeMonth = (year, month) => {
    let beforeYear:any = undefined;
    let beforeMonth:any = undefined;
    if (month == 1) {
      beforeYear = year - 1;
      beforeMonth = 12;
    } else {
      beforeYear = year;
      beforeMonth = month - 1;
    }
    return getCurrentMonthDayNum(beforeYear, beforeMonth);
  }

  // 获得当前月天数
  const getCurrentMonthDayNum = (year, month) => {
    let leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let notLeapYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // 获得当前月份第一天是周几
    let firstDayWeek = new Date(year + "-" + month + "-" + "1").getDay();
    return {
      monthDaysCount: isLeapYear(year)
        ? leapYear[month - 1]
        : notLeapYear[month - 1],
      firstDayWeek,
    };
  }

      // 判断是否是闰年
  const isLeapYear = (year) => {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
  }


  const goBack = () => {
    Taro.navigateBack()
  }

  // 创建日程
  const createSchedule = () => {

    let selectedDate = calendarData.currentYear + '-' + selectMonth+ '-' + selectDay
    let scheduleData:object = {
      scheduleDate: selectedDate,
    }

    Taro.navigateTo({
      url: '/pages/schedule/index?scheduleData='+ JSON.stringify(scheduleData),
    })
  }

  // 修改/删除日程
  const interviewScheduleEdit = (val) => {
    Taro.navigateTo({
      url: '/pages/schedule/index?scheduleData='+ JSON.stringify(val)
    })
  }

  return (
    <View className='interview'>
      <Navbar onClick={goBack} title="面试设置" />
      <View className='calendar'>
        <View className='calendar-title'>
          <View className='left'>
            {calendarData.currentYear + '/' + (calendarData.currentMonth.toString()[1] || 0 + calendarData.currentMonth.toString()) }
          </View>
          <View className="right">
            <View className='item .md-right-12'>
              <View className='circle .cl-red .md-right-4'></View>
              <Text className='text'>无法参加面试</Text>
            </View>
            <View className='item'>
              <View className='circle .cl-green .md-right-4'></View>
              <Text className='text'>部分时间段可面试</Text>
            </View>
          </View>
        </View>
        <View className='calendar-content'>
          <View className='weekdays-name'>
            <View className="days-name">日</View>
            <View className="days-name">一</View>
            <View className="days-name">二</View>
            <View className="days-name">三</View>
            <View className="days-name">四</View>
            <View className="days-name">五</View>
            <View className="days-name">六</View>
          </View>
          <View className='days'>
            {
              calendarData.monthDays && calendarData.monthDays.map((row, idx) => {
                return <View className='day-row'>
                  {
                    row.map((week, index) => {
                      return <View className="day">
                        <View className={['day-context', week.active? 'active': null].join(' ')} onClick={e => onSelectDay(e, idx,index, week.day)}>
                          <Text className={['text','status'+week.status]}>{ week.day }</Text>
                      </View>
                    </View>
                    })
                  }
                </View>
              })
            }
          </View>
        </View>
      </View>
      <View className='interviewScheduleList'>
        {
          interviewScheduleList && interviewScheduleList.map( (item, idx) => {
            return <View className='list-item' onClick={() => interviewScheduleEdit(item)}>
              <View>
                <Image className='img' src={iconClock} />
                <Text className='timeFrame'>{item.timeFrame}</Text>
              </View>
              <Text className='text'>{item.title}</Text>
            </View>
          })
        }
      </View>
      <View className='btn-container'>
          <View className='btn-add btn' onClick={createSchedule}>
            <Image className='image' src={iconAdd} />
            <Text className='text'>添加</Text>
          </View>
      </View>
    </View>
  )
}

export default Index
