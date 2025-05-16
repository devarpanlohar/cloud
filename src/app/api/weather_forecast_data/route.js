import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    // Validate environment variables
    if (!process.env.WEATHER_API_URL || !process.env.WEATHER_API_KEY) {
      throw new Error('Weather API configuration is missing')
    }

    // Get location from query parameters
    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location') || 'kolkata' // Default to Kolkata if no location provided

    if (!location || typeof location !== 'string') {
      return NextResponse.json(
        { error: 'Location parameter is required and must be a string' },
        { status: 400 },
      )
    }

    // Construct API URL
    const baseurl = process.env.WEATHER_API_URL
    const apikey = process.env.WEATHER_API_KEY
    const completeURL = `${baseurl}${encodeURIComponent(location)}?unitGroup=metric&key=${apikey}&contentType=json`

    // Fetch weather data
    const res = await fetch(completeURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    // Handle API response errors
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      throw new Error(
        `Weather API request failed with status ${res.status}: ${errorData.message || 'Unknown error'}`,
      )
    }

    const data = await res.json()

    // Validate response data structure
    if (!data || !data.latitude || !data.longitude) {
      throw new Error('Invalid weather data received from API')
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Weather API Error:', error.message)

    // Return appropriate error response
    return NextResponse.json(
      {
        error: error.message || 'Failed to fetch weather data',
        details:
          process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: error instanceof TypeError ? 400 : 500 },
    )
  }
}
