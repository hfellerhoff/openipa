// https://umami.is/docs/tracker-functions
type WindowWithUmami = typeof window & {
  umami?: {
    track?: (
      event_name: string,
      event_data: Record<string, string>,
      url?: string,
      website_id?: string
    ) => void;
  };
};

type AnalyticsEventType = 'click';
export const trackAnalyticsEvent = (
  type: AnalyticsEventType,
  event: string,
  data: Record<string, string> = {}
) => {
  const umami = (window as WindowWithUmami)?.umami;

  if (umami?.track) {
    umami.track(event, { type, ...data });
  }
};
