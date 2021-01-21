import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/build-client'
import Header from '../components/header'

const AppComponent = ({ Component, pageProps, currentUser }) => {
	console.log(Component);
  return (
    <div>
      <Header currentUser={currentUser} />
        <Component {...pageProps} />

    </div>
  )
}

AppComponent.getInitialProps = async appContext => {
  const client = buildClient(appContext.ctx)
  console.log(client);
  const {data} = await client.get('/api/users/currentuser')

  let pageProps = {}
  if(appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx)
  }
  return {
    pageProps,
    ...data
  }
}

export default AppComponent