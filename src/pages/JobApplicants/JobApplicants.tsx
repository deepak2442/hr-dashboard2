import { useEffect, useState } from "preact/hooks";
import { jobData } from "../../interface/jobOpenings";
import './JobApplicants.css';
import PageLayout from "../../components/PageLayout/PageLayout";
import { requestHandler } from "../../utils";
import { getAllJobApplicants } from "../../api";

const JobApplicants : preact.FunctionComponent = () => {

    const [pdfURL , setpdfURL] = useState('');

    const [allData, setAllData] = useState<jobData[]>([{
            position: 'engeneer',
            department: 'IT',
            experience: '4+ Years',
            jobType: 'this is the message',
            location: 'Udupi',
            description: 'https://www.africau.edu/images/default/sample.pdf',
            isArchive : 'false',
            profileInformation: [{
                heading: 'this is a heading',
                content: [
                    'this is a content',
                    'this is content 2',
                ]
            }]
        },
        {
            position: 'engeneer 2',
            department: 'IT',
            experience: '4+ Years',
            jobType: 'Full Time',
            location: 'Udupi',
            description: 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf',
            isArchive : 'false',
            profileInformation: []
        },
        {
            position: 'engeneer 3',
            department: 'IT',
            experience: '4+ Years',
            jobType: 'Full Time',
            location: 'Udupi',
            description: 'https://www.africau.edu/images/default/sample.pdf',
            isArchive : 'true',
            profileInformation: []
        },
        {
            position: 'engeneer 4',
            department: 'IT',
            experience: '4+ Years',
            jobType: 'Full Time',
            location: 'Udupi',
            description: 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf',
            isArchive : 'false',
            profileInformation: []
        },
        {
            position: 'engeneer 5' ,
            department: 'IT',
            experience: '4+ Years',
            jobType: 'Full Time',
            location: 'Udupi',
            description: 'https://www.africau.edu/images/default/sample.pdf',
            isArchive : 'false',
            profileInformation: []
        
        }
    ])

    const [loading, setloading] = useState(false);

    useEffect(() => {
        console.log(pdfURL);
        
    }, [pdfURL])

    useEffect(() => {
        document.title = 'Job Applicants';

        requestHandler(
            getAllJobApplicants,
            setloading,
            (response) => {
                setAllData(response.data)
            },
            alert
        );
        setpdfURL('')
    }, [])
    
  return (
    <>
        <PageLayout heading="Job Applicants">

            <div id="jobApplicants">
                <div className="row mb-4">
                    <div className="col-4">
                    <select title={''} class="form-select" data-bs-theme="dark">
                        <option selected value=''>Choose Position</option>
                        <option value='Design'>Web Developer</option>
                        <option value='IT'>UX designer</option>
                    </select>
                    </div>
                </div>

                <div className="border border-2 border-dark rounded p-0 mt-2 mb-5">
                    <table class="table table-dark table-striped m-0">
                        <thead>
                            <tr>
                                <th width='5%' scope="col w-30">SI no.</th>
                                <th width='10%' scope="col w-30">Name</th>
                                <th width='15%' scope="col">Email</th>
                                <th width='15%' scope="col">Phone</th>
                                <th width='40%' scope="col">Message</th>
                                <th width='15%' scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                !loading && allData.map(
                                    (data, index) => {
                                        return (
                                            <tr class={`${data.isArchive === 'true' && 'opacity-251'}`}>
                                                <th>{index+1}</th>
                                                <th>{data.position}</th>
                                                <td>{data.department}</td>
                                                <td>{data.experience}</td>
                                                <td>{data.jobType}</td>
                                                <td>
                                                    <a
                                                        class='btn btn-success'
                                                        // data-bs-toggle="modal" 
                                                        // data-bs-target="#exampleModal"
                                                        // onClick={()=>{setpdfURL(data.description)}}
                                                        href={data.description}
                                                        target={'_'}
                                                        >
                                                            View Resume
                                                    </a>
                                                </td>
                                            </tr>
                                        )
                                    }
                                )
                            }

                            {/* === loading state ===  */}
                            {loading && 
                            <>
                                <TableRowPlaceholder/>
                                <TableRowPlaceholder/>
                                <TableRowPlaceholder/>
                            </>
                            }

                            {/* === no data found === */}
                            { allData.length <1 && 
                                <tr>
                                    <td colSpan={5}  style={'text-align:center;color:#818181'}>
                                        No Applicants {` :(`}
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>



                {/* resume modal  */}

                <div class="modal modal-centered" id='exampleModal' tabindex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable modal-lg ">
                        <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <object
                            data={pdfURL}
                            type="application/pdf"
                            width="100%"
                            height="500px"  onError={() => console.error('Error loading PDF')}

                        >
                            <p>
                            It appears you don't have a PDF plugin for this browser.
                            You can <a target={'_'} href={pdfURL}>download the PDF file.</a>
                            </p>
                        </object>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {/* <button type="button" class="btn btn-primary">Download</button> */}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </PageLayout>
    </>
  )
}

export default JobApplicants;



const TableRowPlaceholder = () => {
    return (
        <tr>
            <td>
                <p class='placeholder-glow' aria-hidden="true">
                    <span class="placeholder col-6"></span>
                </p>
            </td>
            <td>
                <p class='placeholder-glow' aria-hidden="true">
                    <span class="placeholder col-6"></span>
                </p>
            </td>
            <td>
                <p class='placeholder-glow' aria-hidden="true">
                    <span class="placeholder col-6"></span>
                </p>
            </td>
            <td>
                <p class='placeholder-glow' aria-hidden="true">
                    <span class="placeholder col-6"></span>
                </p>
            </td>
            <td>
                <p class='placeholder-glow' aria-hidden="true">
                    <span class="placeholder col-6"></span>
                </p>
            </td>
            <td>
                <a class="btn btn-success disabled placeholder col-8 " aria-disabled="true"></a>
            </td>
        </tr>
    )
}