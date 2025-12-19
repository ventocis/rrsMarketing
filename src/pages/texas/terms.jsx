import React from 'react';
import TexasLayout from '../../components/texas/TexasLayout.jsx';
import SEO from '../../components/SEO.jsx';

export default function TexasTerms() {
  return (
    <TexasLayout>
      <SEO 
        title="Terms of Service - Road Ready Safety"
        description="Terms of service, privacy policy, and student policies for Road Ready Safety's Texas defensive driving course."
      />
      
      {/* Terms and Policies Section */}
      <section className="py-[112px] px-4 sm:px-6 lg:px-8 bg-[#f9fafb]">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col gap-4 items-center mb-12">
            <div className="bg-[#e5f6fe] inline-flex items-center px-4 py-2 rounded-full">
              <span className="text-sm font-semibold text-[#0351b4] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Legal</span>
            </div>
            <h1 className="text-[36px] font-bold text-[#1e2832] text-center leading-[40px] tracking-[-0.9px]" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Security and Privacy Policy
            </h1>
            <p className="text-base text-[#616d7b] text-center leading-6 max-w-2xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Road Ready Driver Instruction LLC d/b/a Road Ready Safety
            </p>
          </div>

          {/* Content */}
          <div className="bg-white border border-[#e4e6ea] rounded-[20px] p-8 lg:p-12">
            <div className="prose prose-lg max-w-none" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Road Ready Safety is committed to protecting the privacy and security of student information, including personal and financial data, collected in connection with enrollment, payment, and participation in its Texas driving safety course.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>1. Scope and Purpose</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                This Security and Privacy Policy applies to all information collected from students and prospective students through Road Ready Safety's website, enrollment process, payment systems, and course platform.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                The purpose of this policy is to describe how Road Ready Safety collects, uses, stores, protects, and shares student information, consistent with applicable laws and regulations.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>2. Information Collected</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Road Ready Safety may collect the following categories of information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base text-[#616d7b] leading-6 mb-4 ml-4">
                <li>Identifying information, such as name, date of birth, driver license number, and contact information (address, email, telephone number);</li>
                <li>Course-related information, such as enrollment date, course progress, quiz and exam results, attendance records, and completion status;</li>
                <li>Payment and billing information, such as transaction amounts, payment method details (processed through third-party payment processors), and billing history;</li>
                <li>Technical information, such as device type, browser type, IP address, and usage logs necessary to deliver the course, verify identity, and maintain platform security.</li>
              </ul>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Road Ready Safety will collect only the information reasonably necessary to provide the course, comply with legal requirements, and maintain accurate records.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>3. Use of Information</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Road Ready Safety uses student information for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base text-[#616d7b] leading-6 mb-4 ml-4">
                <li>To process enrollment, payments, and refunds;</li>
                <li>To deliver course content, track progress, and determine course completion;</li>
                <li>To verify student identity and maintain academic integrity;</li>
                <li>To issue Certificates of Completion and maintain required records;</li>
                <li>To communicate with students about course access, technical issues, deadlines, and policy updates; and</li>
                <li>To comply with reporting, auditing, and other legal or regulatory obligations.</li>
              </ul>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Student information will not be sold or rented to third parties.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>4. Protection of Personal and Financial Data</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Road Ready Safety uses reasonable administrative, technical, and physical safeguards designed to protect personal and financial information from unauthorized access, disclosure, alteration, or destruction. These safeguards may include, but are not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base text-[#616d7b] leading-6 mb-4 ml-4">
                <li>Secure transmission methods (such as encryption) for sensitive data where appropriate;</li>
                <li>Restricted access to student information based on job responsibilities;</li>
                <li>Use of reputable third-party payment processors to handle payment card information; and</li>
                <li>Regular backups and system monitoring intended to detect and mitigate security incidents.</li>
              </ul>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                While Road Ready Safety takes reasonable steps to protect student information, no system can be guaranteed to be completely secure. Students are encouraged to use strong passwords, protect their login credentials, and report any suspected unauthorized access promptly.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>5. Sharing and Disclosure of Information</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Road Ready Safety may disclose student information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base text-[#616d7b] leading-6 mb-4 ml-4">
                <li>To authorized Texas regulatory authorities, including the Texas Department of Licensing and Regulation (TDLR), as required for compliance, auditing, or investigation purposes;</li>
                <li>To law enforcement or other government authorities when required by law, court order, or subpoena;</li>
                <li>To service providers or contractors who assist with payment processing, platform hosting, or other operational functions, and who are obligated to protect the confidentiality of student information; or</li>
                <li>With the student's written consent (and, if applicable, the consent of a parent or legal guardian).</li>
              </ul>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Road Ready Safety will not otherwise disclose identifying student information to third parties except as permitted or required by law.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>6. Retention and Destruction of Information</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Student records, including personal and financial information, will be retained for at least the minimum periods required by Texas law and as described in the Records Retention and Access Policy.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                After the applicable retention period, records containing sensitive information will be securely destroyed or anonymized using methods intended to prevent reconstruction or unauthorized access.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>7. Student Rights and Contact Information</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Students may request information about their course records, including completion status and certificates, in accordance with the Records Retention and Access Policy.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Questions about this Security and Privacy Policy, or requests related to student information, may be directed to Road Ready Safety through the contact information provided on the website or in enrollment materials.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-12">
                By enrolling in the course, the student acknowledges that they have been provided access to this Security and Privacy Policy and understand how their personal and financial information will be collected, used, and protected by Road Ready Safety.
              </p>

              {/* Student Identity Verification Policy */}
              <h1 className="text-[36px] font-bold text-[#1e2832] leading-[40px] tracking-[-0.9px] mt-16 mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Student Identity Verification Policy
              </h1>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Road Ready Driver Instruction LLC, doing business as Road Ready Safety ("Road Ready Safety"), maintains a student identity verification system for its online driving safety course to ensure that the individual who enrolls in the course is the same individual who completes all instructional activities and receives any Certificate of Completion.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>1. Purpose and Scope</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                This policy applies to all students who enroll in Road Ready Safety's Texas driving safety course and governs identity verification at enrollment, during login, and throughout all course activities, including but not limited to modules, quizzes, and the final examination.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                The objective of this policy is to preserve the integrity of course completion records, protect courts and other stakeholders who rely on Certificates of Completion, and prevent fraud, impersonation, or unauthorized participation.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>2. Identity Verification at Enrollment</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                At the time of enrollment, Road Ready Safety requires each student to provide accurate personal and contact information, including full legal name, date of birth, driver license number and issuing state, email address, and mailing address, along with any required citation or court information if the course is being taken for ticket dismissal or court-related purposes.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                By completing the enrollment process, the student affirms that all information submitted is true and correct, that the student alone will complete the course, and that the student understands that providing false or misleading information may result in termination of enrollment, denial of a Certificate of Completion, and notification to appropriate authorities or courts as necessary.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>3. Multi-Factor Authentication (MFA) for Access</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Road Ready Safety uses email-based multi-factor authentication as the primary method of identity verification for access to the course platform. To access the course, a student must log in using the registered email address and password and then successfully complete a second authentication step by entering a time-sensitive authentication code sent to the student's registered email address.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                No student may access course content, quizzes, or the final exam without successfully completing this authentication process. The student is responsible for maintaining exclusive control of the email account used for registration and for safeguarding login credentials against unauthorized use.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>4. Ongoing Identity Assurance During the Course</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Identity verification is not limited to the moment of login. Road Ready Safety's system continuously associates all course activity with the authenticated student account for the duration of each session. Course timers, progression controls, and completion tracking are tied to the authenticated identity to help ensure that the person who logs in is the same person who views content, answers questions, and completes the final exam.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                If unusual or inconsistent patterns of access or completion are detected that reasonably suggest that someone other than the enrolled student may be participating, Road Ready Safety may suspend access, require additional verification, or terminate the student's enrollment.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>5. System Monitoring and Audit Logs</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                To support identity verification and maintain the integrity of academic records, Road Ready Safety's course platform automatically records and retains technical and activity data related to student participation. This may include information such as login dates and times, authentication events, course progression, module access times, quiz and examination completion, and general device or browser information associated with use of the platform.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                These records are maintained for the required retention period under Road Ready Safety's Records Retention Policy and may be reviewed internally for quality assurance, security, and compliance purposes. Where permitted or required by law, such records may also be made available to appropriate regulatory or governmental authorities.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>6. Failure of Identity Verification</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                If Road Ready Safety determines, in its reasonable judgment, that identity verification has failed or that course activity indicates possible impersonation, shared accounts, or other misuse, Road Ready Safety may immediately terminate the student's access to the course. In such cases, the student will receive a failing status for the course and will not be issued a Certificate of Completion.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                If enrollment is terminated for identity-related reasons, any re-enrollment will be treated as a new registration and will require payment of all applicable tuition and fees. Road Ready Safety is not obligated to reinstate lost progress, remove identity-related flags, or override a prior determination that identity verification has failed.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>7. Student Responsibilities</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Students are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base text-[#616d7b] leading-6 mb-4 ml-4">
                <li>Providing accurate and complete information during enrollment;</li>
                <li>Maintaining exclusive control of the email account and login credentials associated with their course;</li>
                <li>Personally completing all modules, quizzes, and the final exam without assistance from any other person;</li>
                <li>Using the course platform in a manner that allows them to receive and respond to authentication prompts; and</li>
                <li>Promptly notifying Road Ready Safety if they suspect their account or email has been compromised.</li>
              </ul>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Any attempt to allow another person to access the course, complete coursework, or otherwise circumvent identity verification requirements is strictly prohibited and may result in termination of enrollment without refund and refusal to issue a Certificate of Completion.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>8. Provider Responsibilities</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Road Ready Safety is responsible for maintaining reasonable technical and administrative measures to verify student identity, safeguard student information, and ensure that certificates are issued only to students who have personally completed all course requirements. Road Ready Safety will apply this policy consistently and in good faith to all students.
              </p>

              {/* Refund and Withdrawal Policy */}
              <h1 className="text-[36px] font-bold text-[#1e2832] leading-[40px] tracking-[-0.9px] mt-16 mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Refund and Withdrawal Policy
              </h1>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Road Ready Driver Instruction LLC, doing business as Road Ready Safety ("Road Ready Safety"), maintains the following refund and withdrawal policy for students enrolled in its Texas driving safety course.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>1. Definitions</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                For purposes of this policy:
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-2">
                <strong>"Course Access"</strong> means the point at which a student is first granted access to required course materials, including modules, quizzes, and the final exam, whether or not the student actually logs in or begins work.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-2">
                <strong>"Payment Date"</strong> means the date on which Road Ready Safety receives full or partial payment of tuition or fees from or on behalf of the student.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                <strong>"Effective Date of Withdrawal or Termination"</strong> means the earlier of:
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-2 ml-4">
                (a) the date Road Ready Safety receives the student's written notice of withdrawal, or
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8 ml-4">
                (b) the last date on which the student accessed or completed any academically related activity in the course.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>2. Three-Day Cancellation and Full Refund</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                A student is entitled to a full refund of all monies paid if the student cancels enrollment before midnight of the third calendar day, excluding weekends and legal holidays, after the date the enrollment contract is executed.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                This right applies even if the student accesses course content within the three-day period. The cancellation request must be submitted in writing by email or through the designated support portal.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                When a valid three-day cancellation request is received, Road Ready Safety will issue a full refund of all tuition and fees paid, without penalty.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                This right does not apply if you successfully complete the course or receive a failing grade on the course examination within that three-day period, as provided by Texas Education Code §1001.401(1).
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                If your enrollment was procured by a misrepresentation in our advertising or by any owner or employee, you are entitled to a full refund of all money paid, consistent with §1001.401(2).
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>3. Satisfactory Completion and Certificate Eligibility</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                A student is considered to have satisfactorily completed the course only when all of the following conditions have been met:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base text-[#616d7b] leading-6 mb-4 ml-4">
                <li>The student has completed all required instructional modules and course content;</li>
                <li>The student has passed all required quizzes and the final exam;</li>
                <li>The student has satisfied all identity verification and security requirements; and</li>
                <li>All tuition and fees owed to Road Ready Safety have been paid in full.</li>
              </ul>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Only after these conditions are met will Road Ready Safety issue a Certificate of Completion. Road Ready Safety may withhold issuance of a certificate until any outstanding financial obligations or required course elements have been satisfied.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>4. Refunds After the Three-Day Cancellation Period</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                After the three-day cancellation period has expired, a student who withdraws from the course or is terminated by Road Ready Safety before completing all instructional hours is eligible for a refund of the unused portion of tuition and refundable fees. The refund will correspond to the instructional hours not provided, based on the total six-hour course length, less any non-refundable fees that were properly disclosed and associated with services already provided. Road Ready Safety may retain not more than $50 as an administrative expense.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                If Road Ready Safety discontinues the course in a manner that prevents you from completing it, or if a material failure by Road Ready Safety prevents completion, all tuition and fees you have paid become refundable, consistent with Texas Education Code §1001.403.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>5. Pro-Rata Refund When the School Fails Its Obligations</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                For withdrawals or terminations after the three-day cancellation period and before course completion, Road Ready Safety will calculate the refund by determining the portion of tuition corresponding to instructional hours not yet provided. The portion of tuition attributable to instruction already provided may be retained, along with any properly disclosed non-refundable fees for services already rendered. Any portion of tuition and refundable fees attributable to instructional hours not provided will be refunded to the student.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>6. Refund Requests and Processing</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Refund requests must be submitted in writing to Road Ready Safety via the official support portal or the published support email address.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Email refund requests to <a href="mailto:refunds@roadreadysafety.com" className="text-[#03449e] hover:underline">refunds@roadreadysafety.com</a>
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Refunds will be completed not later than thirty (30) days after the Effective Date of Withdrawal or Termination, as defined above, consistent with Texas Education Code §1001.402(b)(5).
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Unless the original payment method is unavailable, refunds will be issued using the same method by which the original payment was made.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>7. Non-Refundable Fees</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Any non-refundable or extra fees, such as administrative charges or optional service fees, will be clearly itemized and disclosed to the student before enrollment is finalized. Such fees may be retained by Road Ready Safety only to the extent they are associated with services actually rendered. If a non-refundable service has not been provided, the associated fee will be refunded.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>8. Documentation and Recordkeeping</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Road Ready Safety will maintain appropriate documentation for each refund, including the student's name, the date the refund was requested, the amount refunded, the date the refund was processed, the reason for the refund, and proof of payment of the refund.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                These records will be retained for at least the period specified in Road Ready Safety's Records Retention and Access Policy.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>9. Publication of Refund Policy</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                This Refund and Withdrawal Policy will be made available to students prior to enrollment, included in the enrollment contract, published on the Road Ready Safety website, and provided upon request.
              </p>

              {/* Complaints and Grievance Policy */}
              <h1 className="text-[36px] font-bold text-[#1e2832] leading-[40px] tracking-[-0.9px] mt-16 mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Complaints and Grievance Policy
              </h1>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                This policy establishes the procedures for students to submit complaints or grievances regarding any aspect of Road Ready Safety's Texas driving safety course.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>1. Scope</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                This policy applies to complaints and grievances from current or former students relating to instruction, course content, administrative or technical services, billing or financial issues, accessibility or accommodations, and any other matter connected with Road Ready Safety's course operations.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>2. Informal Resolution</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Students are encouraged to first attempt to resolve concerns informally by contacting Road Ready Safety through the published support channels. Many concerns can be addressed quickly once brought to the attention of support staff or management.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>3. Formal Grievance Submission</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                If a concern is not resolved informally, or if the student prefers to proceed directly to a formal process, the student may submit a written grievance. The written grievance should include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base text-[#616d7b] leading-6 mb-4 ml-4">
                <li>The student's full name and contact information;</li>
                <li>The date or dates of the events giving rise to the grievance;</li>
                <li>A description of the issue or concern;</li>
                <li>Any steps already taken to resolve the matter; and</li>
                <li>The outcome or remedy the student is seeking.</li>
              </ul>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                The grievance may be submitted via mail, email, or the official support portal, as indicated in Road Ready Safety's contact information.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>4. Review</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Road Ready Safety will acknowledge and review grievances. The grievance will be reviewed and investigated by a designated representative.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Road Ready Safety will provide a written response to the student within a reasonable period, typically within fourteen (14) business days after receipt of the grievance, explaining the findings and any actions to be taken.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>5. External Complaints</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                If the student is not satisfied with Road Ready Safety's resolution, the student may submit a complaint to the appropriate Texas regulatory authority that oversees driving safety course providers. Road Ready Safety will provide students with the current name, mailing address, telephone number, and website of the appropriate agency in its published grievance materials and, when applicable, in its written responses to grievances.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Texas Department of Licensing and Regulation, Driver Education and Safety, P.O. Box 12157, Austin, Texas 78711, or by facsimile to (512) 463-9468, or electronically to: <a href="https://www.tdlr.texas.gov/help/" target="_blank" rel="noopener noreferrer" className="text-[#03449e] hover:underline">https://www.tdlr.texas.gov/help/</a>. The current telephone numbers of the department are 800-803-9202 or (512) 463-6599
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>6. Non-Retaliation</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Road Ready Safety will not retaliate against a student for filing a grievance or complaint in good faith or for participating in an investigation or review related to a grievance.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>7. Recordkeeping</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Road Ready Safety will maintain records of formal grievances and their resolutions, including dates of submission and response, for at least the period specified in the Records Retention and Access Policy. These records will be made available for review by regulatory authorities upon lawful request.
              </p>

              {/* Records Retention and Access Policy */}
              <h1 className="text-[36px] font-bold text-[#1e2832] leading-[40px] tracking-[-0.9px] mt-16 mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Records Retention and Access Policy
              </h1>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                This policy governs the retention, security, and availability of student and institutional records maintained by Road Ready Safety for its Texas driving safety course.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>1. Types of Records</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Road Ready Safety maintains records necessary to document student enrollment, participation, completion, and institutional compliance. These records include, but are not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base text-[#616d7b] leading-6 mb-4 ml-4">
                <li>Enrollment agreements and contracts;</li>
                <li>Payment, billing, and tuition records;</li>
                <li>Records of course access, module completion, quiz and exam results, and final status;</li>
                <li>Daily attendance and participation records, including any make-up sessions and the last date of academically related activity;</li>
                <li>Certificates of Completion and any associated grade or score information;</li>
                <li>Records of refunds, cancellations, and withdrawals;</li>
                <li>Grievance and complaint records and their resolutions;</li>
                <li>Instructor and staff qualification and approval records;</li>
                <li>Technical and system logs relevant to course delivery, identity verification, and security; and</li>
                <li>Advertising, promotional, and enrollment materials used to solicit students.</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>2. Retention Periods</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Academic records, including transcripts and final completion records, will be maintained permanently.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                All other student-related records, including enrollment agreements, financial records, attendance and participation records, and grievance files, will be retained for at least three (3) years from the student's last date of attendance, withdrawal, or course completion, whichever is later. In all cases, required student records will be retained for not less than three (3) years).
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Instructor and staff qualification and approval records will be retained for at least five (5) years from the date the individual last provided instructional services for Road Ready Safety, or longer if required by law.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Location of recent records: Records for students who completed training within the previous twelve (12) months will remain accessible at Road Ready Safety's licensed location or primary place of business. After twelve (12) months, records may be stored in secure off-site or electronic storage, provided they remain readily retrievable for student requests and regulatory review.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>3. Format of Records</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Records may be maintained in electronic or physical form.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Enrollment agreements, billing and payment records, and academic completion records will be maintained or converted into an electronic format within a reasonable period after creation to support secure storage, backup, and timely retrieval.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Electronic records will be backed up regularly to reduce the risk of loss due to system failure or other interruption.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>4. Protection and Disclosure of Sensitive Information</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Road Ready Safety will use reasonable administrative, technical, and physical safeguards to protect personal and sensitive information, including financial data, identity information, and contact details.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                After the applicable retention period has expired, records containing sensitive information will be securely destroyed or anonymized using methods designed to prevent reconstruction or unauthorized access.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Disclosure limits: Road Ready Safety will not release student records that identify a student by name, address, or other personally identifying information except as permitted by law, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base text-[#616d7b] leading-6 mb-4 ml-4">
                <li>To authorized representatives of the Texas Department of Licensing and Regulation (TDLR) or other regulatory authorities with jurisdiction;</li>
                <li>To a peace officer or other law enforcement authority;</li>
                <li>In response to a valid court order or subpoena; or</li>
                <li>With the written consent of the student, and if applicable, the student's parent or legal guardian.</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>5. Student Access to Records</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Students may request copies of their academic records, such as transcripts, proof of completion, or duplicate certificates, by contacting Road Ready Safety through the published support channels.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Road Ready Safety may charge a reasonable fee for providing copies or duplicate documents, consistent with applicable law.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Transcripts, certificates, or completion confirmations may be withheld if the student has not met financial obligations to Road Ready Safety, except where disclosure is required by law or prohibited from being conditioned on payment.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>6. Regulatory Access</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                All records covered by this policy will be made available for inspection and copying by authorized Texas regulatory authorities, including the Texas Department of Licensing and Regulation, upon lawful request.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Road Ready Safety will cooperate with such authorities in verifying compliance with applicable statutes and rules and in investigating complaints or concerns.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Records for students who completed training within the previous twelve (12) months will be accessible at the licensed location or primary business site, and older records will be retrievable from secure storage within a reasonable period upon request by regulators or as otherwise required by law.
              </p>

              {/* Student Support Policy */}
              <h1 className="text-[36px] font-bold text-[#1e2832] leading-[40px] tracking-[-0.9px] mt-16 mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Student Support Policy
              </h1>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Road Ready Safety provides student support services to assist with access to the course, understanding of course material, and successful completion of program requirements.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>1. Support Services</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Support services include assistance with technical issues such as login problems, navigation, device compatibility, and access to course materials; basic content-related questions to clarify course material; general guidance on pacing, scheduling, and progress; and coordination of reasonable accommodations for students with documented needs.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>2. Availability and Response Times</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Support services are generally available Monday through Friday during posted business hours. Students may contact support by email, help portal, or other channels specified on the Road Ready Safety website.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Road Ready Safety aims to respond to most technical issues within one business day and to content-related questions within two business days.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>3. Responsibilities of Road Ready Safety</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Road Ready Safety is responsible for maintaining the course platform in a functional state, ensuring that course materials and assessments are accessible as advertised, and providing support staff with sufficient training to address common technical and content-related questions.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>4. Responsibilities of Students</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Students are responsible for reviewing the orientation materials and course instructions, attempting assessments in good faith, and promptly seeking support when encountering technical or academic difficulties. Students must provide accurate information when contacting support and cooperate with support staff in troubleshooting issues.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>5. Escalation of Support Concerns</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                If a student believes that a support-related issue has not been adequately addressed, the student may file a formal grievance in accordance with the Complaints and Grievance Policy.
              </p>

              {/* Non-Refundable Fees Policy */}
              <h1 className="text-[36px] font-bold text-[#1e2832] leading-[40px] tracking-[-0.9px] mt-16 mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Non-Refundable Fees Policy
              </h1>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Certain fees charged by Road Ready Safety are designated as non-refundable once specific services have been rendered.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                The standard administrative fee (currently three dollars ($3.00)) is non-refundable once registration is completed, and in all cases Road Ready Safety will ensure that any administrative expenses retained when a student does not enter the course or withdraws after paying tuition in advance do not exceed fifty dollars ($50.00) in total, as permitted by Texas Education Code §1001.402(b)(3).
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Any other non-refundable fees will be clearly identified as such before enrollment and will correspond to identifiable services, such as expedited processing, optional add-ons, or special administrative services. If a non-refundable service has not been provided, the associated fee will be refunded.
              </p>

              {/* Duplicate Certificate Policy */}
              <h1 className="text-[36px] font-bold text-[#1e2832] leading-[40px] tracking-[-0.9px] mt-16 mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Duplicate Certificate Policy
              </h1>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Road Ready Driver Instruction LLC, doing business as Road Ready Safety ("Road Ready Safety"), may issue duplicate Certificates of Completion when the original certificate is lost, damaged, not received, or contains errors.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                If a student requests a duplicate certificate within thirty (30) calendar days of the original issue date because the original certificate was not received, was unusable, or contained errors due to no fault of the student, Road Ready Safety will issue one duplicate certificate at no cost to the student.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                If a duplicate certificate is requested more than thirty (30) calendar days after the original issue date, or if the duplicate is requested for reasons outside the conditions described above, Road Ready Safety may charge a reasonable processing fee for the duplicate. The current standard fee is ten dollars ($10.00).
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                All duplicate certificates will be issued only after Road Ready Safety confirms the student's identity, verifies the student's course completion status, and records the duplicate issuance in its certificate records.
              </p>

              {/* Course Completion Deadline Policy */}
              <h1 className="text-[36px] font-bold text-[#1e2832] leading-[40px] tracking-[-0.9px] mt-16 mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Course Completion Deadline Policy
              </h1>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Students must complete all course requirements, including modules, quizzes, and the final exam, within ninety (90) days of the registration date unless a shorter deadline is established by the court or another authority.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                If the course is not completed within this period, Road Ready Safety may terminate the student's enrollment and assign a non-complete status. Any refund, if applicable, will be calculated and issued in accordance with Road Ready Safety's Refund and Withdrawal Policy and applicable Texas law.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                To attempt the course after termination for non-completion, the student must re-enroll and pay all applicable tuition and fees.
              </p>

              {/* ADA and Accessibility Policy */}
              <h1 className="text-[36px] font-bold text-[#1e2832] leading-[40px] tracking-[-0.9px] mt-16 mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
                ADA and Accessibility Policy
              </h1>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Road Ready Safety is committed to providing reasonable accommodations to qualified students with disabilities, consistent with applicable laws and with the integrity of course requirements.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Students who require accommodations should notify Road Ready Safety as early as possible, preferably at or shortly after enrollment, by contacting support through the published channels and describing the requested accommodation and the nature of the limitation.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Road Ready Safety will review each request individually and may request appropriate documentation when needed to determine a reasonable accommodation. Examples of accommodations may include extended time limits, alternative formats, or assistance with navigation, provided that such accommodations do not compromise course integrity or identity verification requirements.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Road Ready Safety will make good-faith efforts to provide reasonable accommodations and to communicate clearly with students about available options and any limitations.
              </p>

              {/* Grievance Escalation and Regulatory Complaint Policy */}
              <h1 className="text-[36px] font-bold text-[#1e2832] leading-[40px] tracking-[-0.9px] mt-16 mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Grievance Escalation and Regulatory Complaint Policy
              </h1>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                This Grievance Escalation and Regulatory Complaint Policy supplements Road Ready Safety's Complaints and Grievance Policy and describes how student concerns may be escalated internally and externally.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>1. Internal Escalation Process</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                When a student submits a formal grievance, the matter will first be reviewed by a designated staff member or manager, who will investigate the concern and provide a written response within a reasonable time frame as stated in the Complaints and Grievance Policy.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                If the student is not satisfied with the initial written response, the student may request that the grievance be escalated internally. Upon such request, the grievance, along with any supporting documentation and the initial response, will be reviewed by a higher-level designee, which may include a compliance officer, director, or owner of Road Ready Safety.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                The internal escalation review will include consideration of the original grievance, any additional information provided by the student, and any further information gathered by Road Ready Safety. A final written determination will be issued to the student within a reasonable period after the escalation request is received. That final internal response will state Road Ready Safety's conclusion on the matter and any corrective actions or remedies, if applicable.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Road Ready Safety's internal escalation decision is final at the school level. However, students retain the right to seek review by the appropriate state regulatory authority as described below.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>2. Right to File a Complaint with the Texas Department of Licensing and Regulation (TDLR)</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                If a student is not satisfied with Road Ready Safety's final internal resolution of a grievance, the student has the right to contact the Texas Department of Licensing and Regulation (TDLR), which regulates driver education and driving safety course providers. Students may seek assistance, submit a complaint, or request information about their rights directly from TDLR.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Road Ready Safety will notify students of TDLR's complaint contact information, including the department's name, mailing address, telephone number, and email address, for directing complaints regarding the Driver Education and Safety Program. This complaint information will appear on the front of each uniform Certificate of Course Completion and on at least one of the following, as required by Texas rules:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base text-[#616d7b] leading-6 mb-4 ml-4">
                <li>the enrollment or registration form or written enrollment contract;</li>
                <li>a sign prominently displayed at any physical school location (if applicable); or</li>
                <li>a bill or receipt for services.</li>
              </ul>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Current TDLR complaint contact information will also be made reasonably available to students in Road Ready Safety's published grievance materials and on the Road Ready Safety website. Nothing in this policy prevents a student from contacting TDLR at any time; students are not required to exhaust Road Ready Safety's internal grievance process before filing a complaint with the department.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>3. Non-Retaliation</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Road Ready Safety will not take adverse action or retaliate against any student who files a grievance or complaint in good faith, either internally or with a regulatory authority, or who participates in a grievance or complaint investigation.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>4. Recordkeeping</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                All grievances and escalations, along with Road Ready Safety's responses and any related correspondence, will be maintained in accordance with the Records Retention and Access Policy and will be available for review by authorized regulatory authorities upon lawful request.
              </p>

              {/* Student Enrollment Contract and Acknowledgment Policy */}
              <h1 className="text-[36px] font-bold text-[#1e2832] leading-[40px] tracking-[-0.9px] mt-16 mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Student Enrollment Contract and Acknowledgment Policy
              </h1>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                This Student Enrollment Contract and Acknowledgment Policy describes the terms under which a student enrolls in Road Ready Safety's Texas driving safety course. Acceptance of these terms constitutes the enrollment contract between the student and Road Ready Driver Instruction LLC d/b/a Road Ready Safety.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                A copy of this enrollment contract will be provided to the student electronically at the time of enrollment and retained in Road Ready Safety's student records.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>Required Contract Information</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                This enrollment contract includes, or will display at the time of electronic signing, the student's legal name, driver license number (for driving safety courses), residential address, telephone number, and date of birth. It also identifies Road Ready Driver Instruction LLC d/b/a Road Ready Safety by full legal name and Texas driving safety provider license number, specifies the six-hour online driving safety course being taken, itemizes all tuition, fees, and other charges with the terms of payment, and states the total contract charge. The contract identifies the number of instructional modules, the total instructional time of 300 minutes plus required breaks, and the maximum time allowed for completion of the course.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                The student understands that this course is delivered entirely online through Road Ready Safety's website. Instruction may begin any time after enrollment and payment are completed, and all course requirements must be completed within ninety (90) days of the registration date unless otherwise specified in writing. No in-car instruction or behind-the-wheel training is provided as part of this course.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>Certificate Issuance Limitation</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Road Ready Safety is prohibited from issuing a uniform Certificate of Completion if the student has not met all course completion requirements, and the student should not accept a certificate under such circumstances.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>Privacy Policy Acknowledgment</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Road Ready Safety maintains a Security and Privacy Policy describing how we collect, use, store, and protect student personal and financial information. By enrolling, the student acknowledges that they have been provided access to this policy and understands that their data will be handled in accordance with it.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>Attendance, Completion Time, and Conduct</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                Because this course is provided online and on-demand, there are no scheduled classroom sessions and no physical attendance is required. Instead, the student is expected to complete all modules, quizzes, and the final examination within ninety (90) days of registration. Failure to complete the course within this period may result in termination of enrollment and forfeiture of tuition and fees, except as provided in the Refund and Withdrawal Policy.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                The student agrees to conduct themselves respectfully when communicating with Road Ready Safety staff, to comply with all course rules, and to refrain from any form of academic dishonesty or misuse of the course platform. Violations of these standards may result in termination of enrollment and denial of a Certificate of Completion.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>1. Parties and Course</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                The parties to this enrollment contract are:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base text-[#616d7b] leading-6 mb-4 ml-4">
                <li>Road Ready Driver Instruction LLC, doing business as Road Ready Safety ("Road Ready Safety" or "the school"); and</li>
                <li>The individual student who completes the enrollment process ("the student").</li>
              </ul>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                The student is enrolling in a six-hour online driving safety course offered by Road Ready Safety for the purpose of driver improvement, and where applicable, for potential ticket dismissal or court-ordered completion, subject to the requirements of the court or other authority.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>2. Term of Contract</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                This enrollment contract becomes effective on the date the student electronically accepts the terms of enrollment. No payment will be accepted until after the student has executed this enrollment contract.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                The contract remains in effect until the earlier of:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base text-[#616d7b] leading-6 mb-4 ml-4">
                <li>Successful completion of the course and issuance of a Certificate of Completion;</li>
                <li>Termination of enrollment by the student; or</li>
                <li>Termination of enrollment by Road Ready Safety in accordance with school policies.</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>3. Tuition, Fees, and Payment</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                The student agrees to pay all published tuition and fees associated with the course. Non-refundable fees, if any, will be clearly identified before enrollment is finalized and are associated with specific services, such as administrative processing or optional add-on services.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Payment is due as stated at the time of enrollment. Enrollment and access to the course may be withheld, suspended, or terminated if payment is declined, reversed, or otherwise not received.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>4. Duplicate Certificates</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                The student understands and agrees that if a Certificate of Completion is not received, is unusable, or contains errors due to no fault of the student, and the student notifies Road Ready Safety within thirty (30) calendar days of the original issue date, Road Ready Safety will issue one duplicate certificate at no additional cost to the student.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                The student further understands that requests for duplicate certificates made more than thirty (30) days after the original issue date, or requests that do not meet the conditions described above, may be subject to a reasonable duplicate certificate processing fee, as published by Road Ready Safety at the time of the request.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>5. Refund and Withdrawal Terms</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                The student acknowledges that they have been provided with, and agree to be bound by, Road Ready Safety's Refund and Withdrawal Policy, which describes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base text-[#616d7b] leading-6 mb-4 ml-4">
                <li>The three-day cancellation period during which the student is entitled to a full refund of all monies paid;</li>
                <li>The conditions under which refunds may or may not be granted after the three-day cancellation period; and</li>
                <li>The procedures for requesting a refund and the time frames for processing refunds.</li>
              </ul>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                By enrolling, the student confirms that they have read and understand the Refund and Withdrawal Policy and agree that it forms part of this contract.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>6. Course Requirements and Completion</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                The student understands that successful completion of the course requires:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base text-[#616d7b] leading-6 mb-4 ml-4">
                <li>Completion of all required instructional modules and content;</li>
                <li>Passing all required quizzes and the final examination with at least the minimum passing score established by Road Ready Safety;</li>
                <li>Compliance with the Student Identity Verification Policy and all academic integrity requirements; and</li>
                <li>Payment in full of all tuition and fees.</li>
              </ul>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                The student acknowledges that Road Ready Safety does not guarantee any particular legal outcome, such as ticket dismissal, court approval, or insurance benefits. The student is solely responsible for verifying eligibility with the court or other authority, complying with all deadlines, and submitting any required documentation or certificates.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>7. Identity Verification, Academic Integrity, and Conduct</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                The student agrees to comply with the Student Identity Verification Policy, including the use of email-based multi-factor authentication and any other identity verification procedures required by Road Ready Safety.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                The student agrees that they, and only they, will complete all course activities, including viewing content and answering quiz and exam questions, without assistance from any other person and without using unauthorized materials, tools, or services.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                The student further agrees to maintain appropriate conduct when interacting with Road Ready Safety staff and systems, to refrain from abusive or disruptive behavior, and to comply with all policies published by Road Ready Safety.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Violation of identity verification requirements, academic integrity standards, or conduct expectations may result in termination of enrollment, denial of a Certificate of Completion, and forfeiture of tuition and fees, as described in applicable policies.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>8. Technology and Access Requirements</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                The student is responsible for having access to a compatible device, internet connection, and email account capable of receiving authentication codes and course-related communications. Road Ready Safety will provide general information regarding recommended browser and device specifications, but cannot guarantee performance on all devices or networks.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                The student understands that normal variations in internet speed and connectivity may affect their experience and is encouraged to complete the course in an environment with stable access.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>9. Course Completion Deadline</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                The student agrees to complete all course requirements within the completion period specified by Road Ready Safety, generally ninety (90) days from the date of registration, unless a different period is explicitly specified. Failure to complete the course within the allowed period may result in termination of enrollment and forfeiture of tuition and fees, except where Road Ready Safety has failed to meet its essential obligations.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Re-enrollment after termination for non-completion will require a new registration and payment of all applicable tuition and fees.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>10. Student Support, Grievances, and Escalation</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                The student acknowledges that information about technical and academic support services, including availability and contact methods, has been provided in the Student Support Policy.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                The student further acknowledges that information about submitting grievances and escalating concerns, including the possibility of contacting the appropriate Texas regulatory authority, has been provided in the Complaints and Grievance Policy and the Grievance Escalation and Regulatory Complaint Policy. These policies are incorporated into this enrollment contract.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>11. ADA and Accessibility</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                The student acknowledges that Road Ready Safety provides reasonable accommodations for students with disabilities, consistent with applicable laws and the integrity of course requirements, as described in the ADA and Accessibility Policy. The student agrees to promptly notify Road Ready Safety of any accommodation needs so that appropriate arrangements can be considered.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>12. Governing Law</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                This enrollment contract and all related policies are governed by the laws of the State of Texas. Any disputes arising from or related to this contract, to the extent not resolved through the grievance process or by regulatory authorities, shall be handled in accordance with applicable Texas law.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>13. Acknowledgment and Acceptance</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-4">
                By completing the online enrollment process, checking the applicable acknowledgment box, and submitting payment where required, the student affirms that they:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base text-[#616d7b] leading-6 mb-4 ml-4">
                <li>Have read and understand this Student Enrollment Contract and Acknowledgment Policy;</li>
                <li>Have received and reviewed the Refund and Withdrawal Policy, Student Identity Verification Policy, Complaints and Grievance Policy, Records Retention and Access Policy, Student Support Policy, Non-Refundable Fees Policy, Course Completion Deadline Policy, and ADA and Accessibility Policy;</li>
                <li>Agree to be bound by all such policies as a condition of enrollment; and</li>
                <li>Understand that these policies, together with this contract, form the complete agreement between the student and Road Ready Safety with respect to the course.</li>
              </ul>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Electronic acceptance and submission of the enrollment form shall have the same force and effect as a handwritten signature.
              </p>

              <h2 className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>14. Notice to Students</h2>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Any grievances not resolved by the provider may be forwarded to the Texas Department of Licensing and Regulation, Driver Education and Safety, P.O. Box 12157, Austin, Texas 78711, or by facsimile to (512) 463-9468, or electronically to: <a href="https://www.tdlr.texas.gov/help/" target="_blank" rel="noopener noreferrer" className="text-[#03449e] hover:underline">https://www.tdlr.texas.gov/help/</a>. The current telephone numbers of the department are 800-803-9202 or (512) 463-6599
              </p>
            </div>
          </div>
        </div>
      </section>
    </TexasLayout>
  );
}

