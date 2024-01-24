import { getClient } from 'apollo/ssr_client';
import { BASE_URL } from 'constants/constants';
import { GET_ALL_COURSES_PUBLIC_META_DATA } from 'graphql/queries/queries';
import { MetadataRoute } from 'next/types';

export async function generateSitemaps() {
  const { data } = await getClient().query({
    query: GET_ALL_COURSES_PUBLIC_META_DATA,
  });

  return data.coursesPublic.map((_course, i) => {
    return {
      id: i,
    };
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await getClient().query({
    query: GET_ALL_COURSES_PUBLIC_META_DATA,
  });

  return data.coursesPublic.map((course) => ({
    url: `${BASE_URL}/course/${course._id}`,
    lastModified: course.updatedAt,
  }));
}
