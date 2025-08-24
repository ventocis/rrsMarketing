import React from "react";
import { useParams, Link } from "react-router-dom";
import { getStateRequirements } from "../utils/stateRequirements.js";
import courses from "../data/courses.json";
import DocPage from "../components/DocPage.jsx";

export default function CourseRequirements() {
  const { slug } = useParams();
  
  // Find the course
  const course = courses.find(c => c.slug === slug);
  
  if (!course) {
    return (
      <div className="max-w-2xl mx-auto py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Course not found</h1>
        <p className="text-gray-600 mb-8">This course isn't available yet.</p>
        <Link to="/" className="text-blue-600 hover:underline">
          Back to home
        </Link>
      </div>
    );
  }

  // Get state requirements data
  const stateRequirements = getStateRequirements(course.state, course.course_type);
  
  // Generate markdown content from state requirements or fallback to basic course info
  const generateMarkdown = () => {
    let markdown = `# ${course.course_name} - Course Requirements\n\n`;
    markdown += `_Last updated: ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}_\n\n`;
    
    if (stateRequirements) {
      // Use detailed state requirements data
      
      // Who this course is for
      if (stateRequirements.who_for) {
        markdown += `## Who This Course Is For\n\n`;
        markdown += `${stateRequirements.who_for}\n\n`;
      }
      
      // Requirements
      if (stateRequirements.requirements && stateRequirements.requirements.length > 0) {
        markdown += `## Requirements & Deadlines\n\n`;
        stateRequirements.requirements.forEach(req => {
          markdown += `- ${req}\n`;
        });
        markdown += `\n`;
      }
      
      // Submission details
      if (stateRequirements.submission) {
        markdown += `## Submission Details\n\n`;
        
        if (stateRequirements.submission.certificate) {
          markdown += `**Certificate Submission:** ${stateRequirements.submission.certificate}\n\n`;
        }
        
        if (stateRequirements.submission.reporting) {
          markdown += `**Reporting Method:** ${stateRequirements.submission.reporting}\n\n`;
        }
        
        if (stateRequirements.submission.deadlines) {
          markdown += `**Deadlines:** ${stateRequirements.submission.deadlines}\n\n`;
        }
      }
      
      // Court vs Insurance
      if (stateRequirements.court_vs_insurance) {
        markdown += `## Court vs Insurance Use\n\n`;
        
        if (stateRequirements.court_vs_insurance.court) {
          markdown += `### For Court/Tickets\n\n`;
          markdown += `${stateRequirements.court_vs_insurance.court}\n\n`;
        }
        
        if (stateRequirements.court_vs_insurance.insurance) {
          markdown += `### For Insurance\n\n`;
          markdown += `${stateRequirements.court_vs_insurance.insurance}\n\n`;
        }
      }
      
      // Official sources
      if (stateRequirements.sources && stateRequirements.sources.length > 0) {
        markdown += `## Official Sources\n\n`;
        markdown += `For the most up-to-date information, please refer to these official sources:\n\n`;
        
        stateRequirements.sources.forEach(source => {
          markdown += `- [${source.name}](${source.url})\n`;
        });
        markdown += `\n`;
      }
    } else {
      // Fallback: Show basic course information when state requirements aren't available
      markdown += `## Course Overview\n\n`;
      markdown += `${course.blurb || 'This course provides state-approved driver education and improvement training.'}\n\n`;
      
      if (course.eligibility) {
        markdown += `## Eligibility\n\n`;
        markdown += `${course.eligibility}\n\n`;
      }
      
      if (course.identity_verification) {
        markdown += `## Identity Verification\n\n`;
        markdown += `${course.identity_verification}\n\n`;
      }
      
      if (course.reporting_method) {
        markdown += `## Reporting Method\n\n`;
        markdown += `${course.reporting_method}\n\n`;
      }
      
      if (course.certificate_delivery) {
        markdown += `## Certificate Delivery\n\n`;
        markdown += `${course.certificate_delivery}\n\n`;
      }
      
      markdown += `> **Note:** Detailed state-specific requirements for this course are being updated. Please contact your court, insurer, or the relevant state agency for the most current information.\n\n`;
    }
    
    // Additional course info (always shown)
    markdown += `## Course Information\n\n`;
    markdown += `- **Course Name:** ${course.course_name}\n`;
    markdown += `- **State:** ${course.state}\n`;
    markdown += `- **Duration:** ${course.duration_hours} hours\n`;
    markdown += `- **Price:** $${course.price_usd}\n`;
    markdown += `- **Provider:** ${course.provider_name || 'Road Ready'}\n\n`;
    
    if (course.eligibility && !stateRequirements) {
      markdown += `**Eligibility:** ${course.eligibility}\n\n`;
    }
    
    if (course.identity_verification && !stateRequirements) {
      markdown += `**Identity Verification:** ${course.identity_verification}\n\n`;
    }
    
    if (course.reporting_method && !stateRequirements) {
      markdown += `**Reporting Method:** ${course.reporting_method}\n\n`;
    }
    
    if (course.certificate_delivery && !stateRequirements) {
      markdown += `**Certificate Delivery:** ${course.certificate_delivery}\n\n`;
    }
    
    markdown += `---\n\n`;
    markdown += `**Need help?** Visit our [Help Center](/support) or contact us at info@roadreadysafety.com\n\n`;
    markdown += `*This information is provided for reference only. Always confirm requirements with your court, insurer, or the relevant state agency.*`;
    
    return markdown;
  };

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: course.course_name, href: `/courses/${slug}` },
    { label: "Course Requirements" }
  ];

  return (
    <DocPage
      title={`${course.course_name} - Course Requirements`}
      subtitle={stateRequirements ? "Complete course requirements, submission details, and official sources" : "Course information and requirements"}
      markdown={generateMarkdown()}
      showContactCard={true}
      breadcrumbs={breadcrumbs}
    />
  );
}
