/** @format */

import React, { StrictMode } from 'react';
import NextApp, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { Global } from '@emotion/core';
import { ReactQueryDevtools } from 'react-query-devtools';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { UserType } from '@project/types/User';
import { getSession } from '@project/services';
import { globalStyles } from '@project/theme';
import { AuthProvider } from '@project/context';
import { isProtectedRoute } from './model';

type CustomAppContext = AppProps & {
  session: UserType;
};

const queryCache = new QueryCache();

export default class App extends NextApp<CustomAppContext> {
  public static async getInitialProps({ ctx, Component, router }: AppContext) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    if (ctx.req && ctx.res) {
      try {
        const session = await getSession(ctx.req);

        if (!session && isProtectedRoute(router.route)) {
          ctx.res.writeHead(307, { Location: '/login' });
          ctx.res.end();
        }

        if (session && !isProtectedRoute(router.route)) {
          ctx.res.writeHead(307, { Location: '/' });
          ctx.res.end();
        }

        return {
          pageProps,
          session
        };
      } catch (error) {
        console.error(error);
      }
    }

    return {
      pageProps
    };
  }

  public render() {
    const { Component, pageProps, session } = this.props;

    return (
      <StrictMode>
        <ReactQueryCacheProvider queryCache={queryCache}>
          <AuthProvider session={session}>
            <Global styles={globalStyles} />
            <Head>
              <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
              />
            </Head>
            <Component {...pageProps} />
            <ReactQueryDevtools />
          </AuthProvider>
        </ReactQueryCacheProvider>
      </StrictMode>
    );
  }
}
