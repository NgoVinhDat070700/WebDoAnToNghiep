import { useEffect, useState } from 'react'
import moment from 'moment'
// material-ui
import { Box, Grid, Typography } from '@mui/material'
import AnalyticEcommerce from '@/components/AnalyticEcommerce'
import IncomeAreaChart from './IncomeAreaChart'
import { AssignmentTurnedIn, CardTravel, DonutLarge, People, Timeline } from '@mui/icons-material'
import MainCard from '@/components/MainCard'
import { useGetIncomeStatsQuery, useGetStatusStatsQuery, useGetUsersStatsQuery } from '@/redux/api/analyticsApi'
import { fCurrency, getNameByValue } from '@/utils/formatNumber'
import { CONSTANT, dateFormat } from '@/config'
import DonutPieChart from './DonutPieChart'
import RangePicker from '@/components/RangePicker'
import { fDate } from '@/utils/formatTime'
import { useGetListProductsQuery } from '@/redux/api/apiSlice'
import { useGetListUserQuery } from '../users/UserSlice'
import AreaChart from './ReportAreaChart'
import { useGetListOrderQuery } from '../orders/orderSlice'
import useLocales from '@/hooks/useLocales'

// project import

// avatar style
const findByDatetimeId = (datetime = '', arr = []) => (datetime ? arr.find((item) => item._id === datetime) : null)

export const getTotalByDatakey = (arr = [], datakey) =>
  arr.reduce((currentValue, nextValue) => currentValue + nextValue[datakey], 0)

const DashboardDefault = () => {
  const { translate } = useLocales()
  const [rangeDateUser, setRangeDateUser] = useState([
    moment().startOf('week').format(dateFormat),
    moment().endOf('week').format(dateFormat),
  ])
  const [rangeDateIncome, setRangeDateIncome] = useState([
    moment().startOf('week').format(dateFormat),
    moment().endOf('week').format(dateFormat),
  ])
  const selectedTags = ['DELIVERED']

  const { data: usersStatQuery, isSuccess: usersStatSuccess } = useGetUsersStatsQuery({
    begin: rangeDateUser[0],
    end: rangeDateUser[1],
  })

  // const { data: variantsStatQuery, isSuccess: variantsStatSuccess } = useGetVariantsStatsQuery({
  //   begin: range[0],
  //   end: range[1],
  // });
  const { data: incomeStatQuery, isSuccess: incomeStatSuccess } = useGetIncomeStatsQuery({
    productId: null,
    orderStatus: selectedTags.length > 0 ? selectedTags.join(',') : '',
    begin: rangeDateIncome[0],
    end: rangeDateIncome[1],
  })
  const { data: dataProducts } = useGetListProductsQuery()
  const { data: orderStatusStatQuery, isSuccess: orderStatusStatSuccess } = useGetStatusStatsQuery({
    productId: null,
    begin: rangeDateIncome[0],
    end: rangeDateIncome[1],
  })
  const { total: totalProduct = 0 } = dataProducts || {}

  const { data: dataUser } = useGetListUserQuery()

  const { total: countUser = 0 } = dataUser || {}
  // const isLoading = !usersStatSuccess || !incomeStatSuccess || !orderStatusStatSuccess
  const [userStatInRange, setUserStatInRange] = useState([])
  const [incomeStatInRange, setIncomeStatInRange] = useState([])
  const orderStatusStatData = orderStatusStatSuccess ? orderStatusStatQuery?.data : []

  const { data: orderData } = useGetListOrderQuery()
  const { orders = [] } = orderData || {}

  let totalPrice = 0
  orders?.map((item) => {
    if (item?.orderStatus.value === 'DELIVERED') totalPrice += item.totalPrice
  })

  useEffect(() => {
    if (usersStatSuccess) {
      const initialStatArr = getDateArrInRange(usersStatQuery.range[0], usersStatQuery.range[1])
      let newUserStatInRange = initialStatArr.map((item) => {
        const foundData = findByDatetimeId(item, usersStatQuery.data)
        if (foundData) return foundData
        return { _id: item, total: 0 }
      })
      setUserStatInRange(newUserStatInRange)
    }
  }, [usersStatSuccess, usersStatQuery])

  useEffect(() => {
    if (incomeStatSuccess) {
      const initialStatArr = getDateArrInRange(incomeStatQuery.range[0], incomeStatQuery.range[1])
      let newIncomeStatInRange = initialStatArr.map((item) => {
        const foundData = findByDatetimeId(item, incomeStatQuery.data)
        if (foundData) return foundData
        return {
          _id: item,
          orderItemsPrice: 0,
          orderShippingPrice: 0,
          orderTotalPrice: 0,
          total: 0,
        }
      })
      setIncomeStatInRange(newIncomeStatInRange)
    }
  }, [incomeStatSuccess, incomeStatQuery])

  const getDateArrInRange = (start, end) => {
    const dateArr = []
    dateArr.unshift(moment(start).subtract(1, 'day').format('YYYY-MM-DD'))
    while (moment(start).isBefore(moment(end))) {
      dateArr.push(moment(start).format('YYYY-MM-DD'))
      start = moment(start).add(1, 'day')
    }
    return dateArr
  }

  const dataColumnGroupedChart = (initdata = []) => {
    let data = []
    initdata.map((item) => {
      data.push({
        date: item._id,
        type: translate('page.dashboard.chart_total_price_product'),
        value: item.orderItemsPrice,
      })
      data.push({
        date: item._id,
        type: translate('page.dashboard.chart_total_shipping'),
        value: item.orderShippingPrice,
      })
      data.push({ date: item._id, type: translate('page.dashboard.chart_total_price'), value: item.orderTotalPrice })
    })
    return data.flat()
  }

  const onChangeRangeDateUser = (dateStrings) => {
    const start = fDate(new Date(dateStrings[0]?.$d).toString())
    const end = fDate(new Date(dateStrings[1]?.$d).toString())
    const dateResult = [start, end]
    setRangeDateUser(dateResult)
  }
  const onChangeRangeDateIncome = (dateStrings) => {
    const start = fDate(new Date(dateStrings[0]?.$d).toString())
    const end = fDate(new Date(dateStrings[1]?.$d).toString())
    const dateResult = [start, end]
    setRangeDateIncome(dateResult)
  }

  return (
    <Grid>
      <Grid container columnSpacing={3}>
        <Grid item xs={12}>
          <Typography variant='h5'>{translate('page.dashboard.title')}</Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <AnalyticEcommerce
            title={translate('page.dashboard.count_product')}
            count={totalProduct}
            icon={<CardTravel />}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <AnalyticEcommerce title={translate('page.dashboard.count_member')} count={countUser} icon={<People />} />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <AnalyticEcommerce
            title={translate('page.dashboard.total_revenue')}
            count={fCurrency(totalPrice)}
            icon={<AssignmentTurnedIn />}
          />
        </Grid>
      </Grid>

      {/* row 2 */}
      <Grid xs={12}>
        <Grid container alignItems='center' justifyContent='space-between'>
          <Grid item>
            <Typography sx={{ fontSize: 16, fontWeight: 'bold', marginTop: 2 }}>
              <Timeline color='secondary' />
              {translate('page.dashboard.revenue_statistics')}
            </Typography>
          </Grid>
          <Grid item={true}>
            <RangePicker value={rangeDateIncome} onChange={onChangeRangeDateIncome} />
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <IncomeAreaChart
              data={dataColumnGroupedChart(incomeStatInRange)}
              xField={'date'}
              yField={'value'}
              seriesField={'type'}
            />
          </Box>
        </MainCard>
      </Grid>

      <Grid container columnSpacing={3} sx={{ marginTop: 2 }}>
        <Grid item xs={8}>
          <Grid sx={{ height: 50 }}>
            <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>
              <Timeline color='secondary' />
              {translate('page.dashboard.user_register')}
            </Typography>
            <RangePicker value={rangeDateUser} onChange={onChangeRangeDateUser} />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <Box>
              <AreaChart data={userStatInRange} />
            </Box>
          </MainCard>
        </Grid>

        <Grid item xs={4}>
          <Grid alignItems='center' justifyContent='space-between' sx={{ marginLeft: 1 }}>
            <Grid item sx={{ height: 50, display: 'flex', alignItems: 'center' }}>
              <DonutLarge color='secondary' />
              <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>
                {translate('page.dashboard.order_statistics')}
              </Typography>
            </Grid>
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <Box>
              <DonutPieChart
                data={orderStatusStatData.map((o) => ({
                  type: getNameByValue(o._id, CONSTANT.ORDER_STATUSES),
                  value: o.total,
                }))}
              />
            </Box>
          </MainCard>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default DashboardDefault
