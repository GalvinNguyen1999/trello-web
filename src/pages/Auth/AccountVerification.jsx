import { useState, useEffect } from 'react'
import { useSearchParams, Navigate } from 'react-router-dom'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import { verifyUserAPI } from '~/apis'

function AccountVerification() {
  // Lấy email và token từ url
  const [searchParams] = useSearchParams()
  const { token, email } = Object.fromEntries([...searchParams])

  // state để biết đã verify hay chưa
  const [verified, setVerified] = useState(false)

  // gọi api verify account
  useEffect(() => {
    if (token && email) {
      verifyUserAPI({ token, email }).then(() => setVerified(true))
    }
  }, [token, email])

  // nếu url có vấn đề, không tồn tài 1 trong 2 tham số thì hiển thị lỗi
  if (!token || !email) {
    return <Navigate to='/404' />
  }

  // hien thi loading
  if (!verified) {
    return <PageLoadingSpinner caption='Verifying your account...' />
  }

  // Điều hướng về trang login cùng giá trị verifiedEmail
  return <Navigate to={`/login?verifiedEmail=${email}`} />
}

export default AccountVerification
