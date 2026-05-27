import { NextRequest, NextResponse } from 'next/server';
import { validateQRCode } from '@/lib/qrGenerator';

/**
 * GET /api/certificate/[qrCode]
 * Public API endpoint to verify a certificate by QR code
 * Returns certificate data if valid and public, or 404
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ qrCode: string }> }
) {
  try {
    const { qrCode } = await params;

    // Validate QR code format
    if (!validateQRCode(qrCode)) {
      return NextResponse.json(
        { error: 'Invalid QR code format' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual Supabase query
    // const { data, error } = await supabase
    //   .from('certifications_applications')
    //   .select(`
    //     id,
    //     qr_code,
    //     certification_issued_date,
    //     certification_expiry_date,
    //     certification_code,
    //     is_public_listed,
    //     status,
    //     user:users(first_name, last_name, country, company)
    //   `)
    //   .eq('qr_code', qrCode)
    //   .eq('status', 'certified')
    //   .single();

    // Mock data for demonstration
    const mockCertificates: Record<string, any> = {
      'IDM-2024-ABC123XYZ789': {
        qr_code: 'IDM-2024-ABC123XYZ789',
        certification_type: 'IDM',
        professional_name: 'Juan García López',
        obtained_date: '2024-03-15',
        expiry_date: '2027-03-15',
        certificate_number: 'AECMI-IDM-2024-0042',
        is_public_listed: true,
        country: 'España',
        company: 'BuildTech Solutions',
      },
      'BDM-2024-DEF456ABC012': {
        qr_code: 'BDM-2024-DEF456ABC012',
        certification_type: 'BDM',
        professional_name: 'María López Pérez',
        obtained_date: '2024-01-20',
        expiry_date: '2027-01-20',
        certificate_number: 'AECMI-BDM-2024-0018',
        is_public_listed: true,
        country: 'España',
        company: 'DesignBIM',
      },
    };

    const certificate = mockCertificates[qrCode];

    if (!certificate) {
      return NextResponse.json(
        { error: 'Certificate not found' },
        { status: 404 }
      );
    }

    // Calculate status based on expiry date
    const now = new Date();
    const expiry = new Date(certificate.expiry_date);
    const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    let status = 'active';
    if (daysUntilExpiry < 0) status = 'expired';
    else if (daysUntilExpiry <= 90) status = 'due';

    return NextResponse.json({
      success: true,
      data: {
        ...certificate,
        status,
      },
    });
  } catch (error) {
    console.error('Certificate verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
