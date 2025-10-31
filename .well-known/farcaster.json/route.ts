import { minikitConfig } from '@/minikit.config';
import { NextResponse } from 'next/server';

export async function GET() {
  const { accountAssociation, miniapp } = minikitConfig;
  
  return NextResponse.json({
    accountAssociation,
    frame: {
      version: miniapp.version,
      name: miniapp.name,
      iconUrl: miniapp.iconUrl,
      splashImageUrl: miniapp.splashImageUrl,
      splashBackgroundColor: miniapp.splashBackgroundColor,
      homeUrl: miniapp.homeUrl,
      webhookUrl: miniapp.webhookUrl,
    },
  });
}