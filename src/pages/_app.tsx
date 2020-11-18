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

type CustomAppContext = AppProps & {
  session: UserType;
};

const queryCache = new QueryCache();

export default class App extends NextApp<CustomAppContext> {
  public static async getInitialProps({ ctx, Component }: AppContext) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    try {
      const session = await getSession(ctx);

      return {
        pageProps,
        session
      };
    } catch (error) {
      console.error(error);
    }

    return {
      pageProps
    };
  }

  public render() {
    const { Component, pageProps, session } = this.props;

    return (
      <StrictMode>
        <Global styles={globalStyles} />
        <ReactQueryCacheProvider queryCache={queryCache}>
          <AuthProvider session={session}>
            <Head>
              <title>Planner</title>
              <meta charSet="utf-8" />
              <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
              />
              <link rel="manifest" href="/manifest.json" />
              <link
                href="/icons/icon-256x256.png"
                rel="icon"
                type="image/png"
                sizes="256x256"
              />
              <link
                href="/icons/icon-512x512.png"
                rel="icon"
                type="image/png"
                sizes="512x512"
              />
              <meta name="theme-color" content="#FFFFFF" />
              <meta name="description" content="Plan your weeks meal" />
            </Head>
            <Component {...pageProps} />
            <ReactQueryDevtools />
          </AuthProvider>
        </ReactQueryCacheProvider>
      </StrictMode>
    );
  }
}
